/**
 * Модуль проверки доступа к данным.
 */
'use strict';

var Mongo = require('./Mongo');
var Bcrypt = require('bcrypt');
var Utils = require('./Utils');
var backFalse = Utils.backFalse;
var getStoredBackFalse = Utils.getStoredBackFalse;
var Mail = require('./Mail');
var Salt = require('./Salt');
var Account = require('./Account');

/**
 * Обработка входа в систему.
 * @param {Object} config Набор параметов.
 * @param {String} config.type Тип аккаунта.
 * @param {String} config.login Логин.
 * @param {String} config.pass Пароль.
 * @param {Function} callback Следующий шаг.
 */
exports.login = function (config, callback) {
    var type = config.type;
    var login = config.login;
    var pass = config.pass;
    var backFalse = getStoredBackFalse(callback);

    if (invalidLoginParams(config)) {
        callback(false);
        return;
    }

    Account.getAccountByLogin(login, type, backFalse(function (account) {

        Salt.checkPass(pass, account.pass, backFalse(function () {

            Salt.makeSession(login, backFalse(function (session, randomSalt) {

                saveSession(login, type, session, randomSalt, backFalse(function () {

                    callback(session);
                }));
            }));
        }));
    }));
};

/**
 * @private
 * @param {Object} config Набор параметов.
 * @param {String} config.type Тип аккаунта.
 * @param {String} config.login Логин.
 * @param {String} config.pass Пароль.
 * @return {Boolean} Результат проверки.
 */
function invalidLoginParams (config) {
    return (
        !config.type ||
        !config.login ||
        !config.pass ||
        (
            config.type !== 'company' &&
            config.type !== 'partner'
        )
    )
}

/**
 * Обработка выхода из системы.
 * @param {String} key Ключ сессии.
 * @param {Function} callback Следующий шаг.
 */
exports.logout = function (key, callback) {
    if (!key) {
        return callback(false);
    }

    removeSession(key, 'company', function (result) {
        if (result === false) {
            return callback(false);
        }

        if (result === true) {
            return callback(true);
        }

        removeSession(key, 'partner', function (result) {
            if (result === false || result === null) {
                return callback(false);
            } else {
                return callback(true);
            }
        });
    });
};

/**
 * Обработка регистрации.
 * @param {Object} config Набор параметров.
 * @param {String} config.type Тип аккаунта.
 * @param {String} config.login Логин.
 * @param {String/Undefined} config.partner Ключ партнера.
 * @param {String} config.captcha Ключ капчи.
 * @param {Function} callback Следующий шаг.
 */
exports.register = function (config, callback) {
    var login = config.login;
    var type = config.type;
    var captcha = config.captcha;
    var backFalse = getStoredBackFalse(callback);

    if (invalidRegisterParams(config)) {
        callback(false);
    }

    checkCaptcha(captcha, backFalse(function () {

        checkLogin(login, type, backFalse(function () {

            Salt.makePass(login, function (pass, passHash) {

                insertNewCompany({
                    login: login,
                    pass: passHash,
                    type: type
                }, backFalse(function () {

                    Mail.sendAuthMail({
                        type: type,
                        login: login,
                        pass: pass
                    }, callback);
                }));
            });
        }));
    }));
};

/**
 * @private
 * @param {Object} config Объект параметров.
 * @param {String} config.type Тип аккаунта.
 * @param {String} config.login Логин.
 * @param {String} config.captcha Капча.
 * @return {Boolean} Результат проверки.
 */
function invalidRegisterParams (config) {
    return (
        !config.type ||
        !config.login ||
        !config.captcha ||
        (
            config.type !== 'company' &&
            config.type !== 'partner'
        )
    )
}

/**
 * @private
 * @param {Object} config Объект параметров.
 * @param {String} config.login Логин.
 * @param {String} config.pass Пароль.
 * @param {String} config.type Тип аккаунта.
 * @param {Function} callback Следующий шаг.
 */
function insertNewCompany (config, callback) {
    var login = config.login;
    var pass = config.pass;
    var type = config.type;

    Mongo
        .collection(type)
        .insertOne(
            {
                login: login,
                pass: pass
            },
            {},
            function (error) {
                callback(!error);
            }
        );
}

/**
 * Обработка смены пароля.
 * @param {String} key Ключ сессии.
 * @param {Function} callback Следующий шаг.
 */
exports.changePass = function (key, callback) {
    var backFalse = getStoredBackFalse(callback);

    if (!key) {
        callback(false);
        return;
    }

    Account.getAccountByKey(key, backFalse(function (account, type) {
        Salt.makePass(account.login, backFalse(function (pass, passHash) {
            Mail.sendAuthMail({
                type: type,
                login: account.login,
                pass: pass
            }, backFalse(function () {
                setAuthData({
                    type: type,
                    session: key,
                    set: {
                        pass: passHash
                    }
                }, backFalse(function () {
                    removeSession(key, type, callback);
                }));
            }));
        }));
    }));
};

/**
 * Обработка смены почты.
 * @param {String} key Ключ сессии.
 * @param {String} login Логин.
 * @param {Function} callback Следующий шаг.
 */
exports.changeEmail = function (key, login, callback) {
    var backFalse = getStoredBackFalse(callback);

    if (!key) {
        callback(false);
        return;
    }

    Account.getAccountByKey(key, backFalse(function (account, type) {
        Salt.makePass(login, backFalse(function (pass, passHash) {
            Mail.sendAuthMail({
                type: type,
                login: login,
                pass: pass
            }, function () {
                setAuthData({
                    type: type,
                    session: key,
                    set: {
                        login: login,
                        pass: passHash
                    }
                }, backFalse(function () {
                    removeSession(key, type, callback);
                }));
            })
        }));
    }));
};

/**
 * Обработка восстановления пароля.
 * @param {String} login Логин.
 * @param {String} type Тип аккаунта.
 * @param {Function} callback Следующий шаг.
 */
exports.restorePass = function (login, type, callback) {
    var backFalse = getStoredBackFalse(callback);

    if (!login) {
        callback(false);
        return;
    }

    Account.getAccountByLogin(login, type, backFalse(function (account) {
        // @TODO
    }));
};

/**
 * @private
 * @param {String} login Логин.
 * @param {String} type Тип аккаунта.
 * @param {String} session Сессия.
 * @param {String} randomSalt Случайная соль.
 * @param {Function} callback Следующий шаг.
 */
function saveSession (login, type, session, randomSalt, callback) {
    Mongo
        .collection(type)
        .findOneAndUpdate(
            {
                login: login
            },
            {
                $set: {
                    session: session,
                    randomSalt: randomSalt
                }
            },
            {},
            function (error) {
                callback(!error);
            }
        );
}

/**
 * @private
 * @param {String} key Ключ сессии.
 * @param {String} type Тип аккаунта.
 * @param {Function} callback
 * Следующий шаг, куда в случае если всё плохо передается false,
 * если всё успешно выполнено передается true,
 * а если документ не был наден - null.
 */
function removeSession (key, type, callback) {
    Mongo
        .collection(type)
        .findOneAndUpdate(
            {
                session: key
            },
            {
                $set: {
                    session: '',
                    randomSalt: ''
                }
            },
            {},
            function (error, document) {
                if (error) {
                    return callback(false);
                }

                if (document.value) {
                    return callback(true);
                } else {
                    return callback(null);
                }
            }
        )
}

/**
 * @private
 * @param {String} captcha Капча.
 * @param {Function} callback Следующий шаг.
 */
function checkCaptcha (captcha, callback) {
    // @TODO

    callback(true);
}

/**
 * @private
 * @param {String} login Логин.
 * @param {String} type Тип аккаунта.
 * @param {Function} callback Следующий шаг.
 */
function checkLogin (login, type, callback) {
    Mongo
        .collection(type)
        .find({
            login: login
        })
        .limit(1)
        .next(function (error, account) {
            if (error || account) {
                callback(false);
            } else {
                callback(true);
            }
        });
}

/**
 * @private
 * @param {Object} config Объект параметров.
 * @param {Object} config.type Тип аккаунта.
 * @param {Object} config.session Ключ сессии.
 * @param {Object} config.set Набор данных для установки.
 * @param {Function} callback Следующий шаг.
 */
function setAuthData (config, callback) {
    Mongo
        .collection(config.type)
        .findOneAndUpdate(
            {
                session: config.session
            },
            {
                $set: config.set
            },
            {},
            function (error) {
                callback(!error);
            }
        )
}

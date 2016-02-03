/**
 * Модуль проверки доступа к данным.
 */
'use strict';

var Mongo = require('./Mongo');
var bcrypt = require('bcrypt');
var emailSender = require('sendgrid')('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');

const PASS_SALT_PREFIX = 'J';
const PASS_SALT_POSTFIX = 'ucanhackit';
const SESSION_SALT_PREFIX = 'K';
const SESSION_SALT_POSTFIX = 'uCaNhaCkUt';
const NEW_PASS_SALT = 'rDdasPf';

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

    getAccountByLogin(login, type, backFalse(function (account) {

        checkPass(pass, account.pass, backFalse(function () {

            makeSession(login, backFalse(function (session, randomSalt) {

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
        callback(false);
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

            makePass(login, function (pass, passHash) {

                insertNewCompany({
                    login: login,
                    pass: passHash,
                    type: type
                }, backFalse(function () {

                    sendRegisterMail(login, pass, callback);
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
    if (!key) {
        callback(false);
    }

    // @TODO
};

/**
 * Обработка смены почты.
 * @param {String} key Ключ сессии.
 * @param {Function} callback Следующий шаг.
 */
exports.changeEmail = function (key, callback) {
    if (!key) {
        callback(false);
    }

    // @TODO
};

/**
 * Обработка восстановления пароля.
 * @param {String} login Логин.
 * @param {Function} callback Следующий шаг.
 */
exports.restorePass = function (login, callback) {
    if (!login) {
        callback(false);
    }

    // @TODO
};

/**
 * @private
 * @param {String} login Логин.
 * @param {String} type Тип аккаунта.
 * @param {Function} callback Следующий шаг.
 */
function getAccountByLogin(login, type, callback) {
    getAccountByProperties(
        {
            login: login
        },
        type,
        callback
    );
}

/**
 * @private
 * @param {String} key Ключ сессии.
 * @param {Function} callback Следующий шаг, куда передается аккаунт и его тип.
 */
function getAccountByKey (key, callback) {
    var properties = {
        session: key
    };

    getAccountByProperties(properties, 'company', function (account) {
        if (account) {
            callback(account, 'company');
        } else {
            getAccountByProperties(properties, 'partner', function () {
                callback(account, 'partner');
            });
        }
    });
}

/**
 * @private
 * @param {Object} properties Объект свойств для запроса.
 * @param {String} type Тип аккаунта.
 * @param {Function} callback Следующий шаг, куда передается аккаунт.
 */
function getAccountByProperties (properties, type, callback) {
    Mongo
        .collection(type)
        .find(
            properties,
            {
                login: 1,
                pass: 1,
                session: 1,
                randomSalt: 1
            }
        )
        .limit(1)
        .next(function (error, account) {
            if (error || !account) {
                callback(false);
            } else {
                callback(account);
            }
        });
}

/**
 * @private
 * @param {String} userPass Пароль пользователя.
 * @param {String} realPassHash Реальный хэш пароля.
 * @param {Function} callback Следующий шаг.
 */
function checkPass (userPass, realPassHash, callback) {
    var userPassSalt = getPassSalt(userPass);

    bcrypt.compare(userPassSalt, realPassHash, function (error, result) {
        if (error || !result) {
            callback(false);
        } else {
            callback(true);
        }
    });
}

/**
 * @private
 * @param {String} login Логин.
 * @param {Function} callback Следующий шаг, в который передается сессия и случайная соль.
 */
function makeSession (login, callback) {
    var loginSalt = getSessionSalt(login);
    var randomSalt = String(Math.random() * Math.random());
    var resultSalt = injectRandomSalt(loginSalt, randomSalt);

    bcrypt.hash(resultSalt, 9, function(error, hash) {
        if (error || !hash) {
            callback(false);
        } else {
            callback(hash, randomSalt);
        }
    });
}

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
 * @param {String} string Некая строка.
 * @return {String} Посоленная строка.
 */
function getPassSalt (string) {
    return PASS_SALT_PREFIX + string + PASS_SALT_POSTFIX;
}

/**
 * @private
 * @param {String} string Некая строка.
 * @return {String} Посоленная строка.
 */
function getSessionSalt (string) {
    return SESSION_SALT_PREFIX + string + SESSION_SALT_POSTFIX;
}

function injectRandomSalt (salt, random) {
    var arraySalt = salt.split('');

    arraySalt.splice(5, 0, random);

    return arraySalt.join('') + random;
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
 * @param {String} login Логин.
 * @param {Function} callback Следующий шаг, куда передается пароль и его хэш.
 */
function makePass (login, callback) {
    var pass;
    var passTplSeed = login + NEW_PASS_SALT + login;

    bcrypt.hash(passTplSeed, 3, function(error, passTpl) {
        if (error || !passTpl) {
            callback(false);
        } else {
            pass = passTpl.slice(7, 15);

            bcrypt.hash(getPassSalt(pass), 9, function(error, hash) {
                if (error || !hash) {
                    callback(false);
                } else {
                    callback(pass, hash);
                }
            });
        }
    });
}

/**
 * @private
 * @param {String} login Логин.
 * @param {String} pass Пароль.
 * @param {Function} callback Следующий шаг.
 */
function sendRegisterMail (login, pass, callback) {
    emailSender.send({
        from: 'robot@xn--h1ailo2b.xn--80asehdb',
        to: login,
        subject: 'Пароль для Фирмы Онлайн',
        text:
            'Данные для входа на сайт фирмы.онлайн\n\r' +
            'Ваш логин: ' + login + '\n\r' +
            'Ваш пароль: ' + pass + '\n\r' +
            'Не сообщайте пароль никому, даже сотруднику Фирмы Онлайн.\n\r'
    }, function (error) {
        callback(!error);
    });
}

/**
 * @private
 * @param {Function} falseCallback Колбек неудачи.
 * @return {Function} Функция, принимаюшая колбек удачи и возвращающая вызов backFalse.
 */
function getStoredBackFalse (falseCallback) {
    return function (trueCallback) {
        return backFalse(falseCallback, trueCallback);
    }
}

/**
 * @private
 * @param {Function} falseCallback Колбек неудачи.
 * @param {Function} trueCallback Колбек удачи со значением.
 * @return {Function} Обертка, принимающая результат.
 */
function backFalse (falseCallback, trueCallback) {
    return function (result) {
        if (result) {
            trueCallback.apply(null, arguments);
        } else {
            falseCallback(false);
        }
    }
}
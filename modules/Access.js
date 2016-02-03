/**
 * Модуль проверки доступа к данным.
 */
'use strict';

var Mongo = require('./Mongo');
var bcrypt = require('bcrypt');

const PASS_SALT_PREFIX = 'J';
const PASS_SALT_POSTFIX = 'ucanhackit';
const SESSION_SALT_PREFIX = 'K';
const SESSION_SALT_POSTFIX = 'uCaNhaCkUt';

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

            makeSession(login, backFalse(function (session) {

                saveSession(login, type, session, backFalse(function () {

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

    // @TODO
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
    if (
        !config.type ||
        !config.login ||
        !config.captcha
    ) {
        callback(false);
    }

    // @TODO
};

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
    Mongo
        .collection(type)
        .find({
            login: login
        })
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
 * @param {Function} callback Следующий шаг, в который передается сессия.
 */
function makeSession (login, callback) {
    var loginSalt = getSessionSalt(login);

    bcrypt.hash(loginSalt, 9, function(error, hash) {
        if (error || !hash) {
            callback(false);
        } else {
            callback(hash);
        }
    });
}

/**
 * @private
 * @param {String} login Логин.
 * @param {String} type Тип аккаунта.
 * @param {String} session Сессия.
 * @param {Function} callback Следующий шаг.
 */
function saveSession (login, type, session, callback) {
    Mongo
        .collection(type)
        .findOneAndUpdate(
            {
                login: login
            },
            {
                $set: {
                    session: session
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
            trueCallback(result);
        } else {
            falseCallback(false);
        }
    }
}
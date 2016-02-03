/**
 * Модуль проверки доступа к данным.
 */
'use strict';

var Mongo = require('./Mongo');

/**
 * Обработка входа в систему.
 * @param {Object} config Набор параметов.
 * @param {String} config.type Тип аккаунта.
 * @param {String} config.login Логин.
 * @param {String} config.pass Пароль.
 * @param {Function} callback Следующий шаг.
 */
exports.login = function (config, callback) {
    if (
        !config.type ||
        !config.login ||
        !config.pass
    ) {
        callback(false);
    }

    // @TODO
};

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
/**
 * Модуль работы с солеными данными.
 */
'use strict';

var Bcrypt = require('bcrypt');

const PASS_SALT_PREFIX = 'J';
const PASS_SALT_POSTFIX = 'ucanhackit';
const SESSION_SALT_PREFIX = 'K';
const SESSION_SALT_POSTFIX = 'uCaNhaCkUt';
const NEW_PASS_SALT = 'rDdasPf';

/**
 * Возвращает соленый пароль.
 * @param {String} string Некая строка.
 * @return {String} Посоленная строка.
 */
exports.getPassSalt = function (string) {
    return PASS_SALT_PREFIX + string + PASS_SALT_POSTFIX;
};

/**
 * Возвращает соленую сессию.
 * @param {String} string Некая строка.
 * @return {String} Посоленная строка.
 */
exports.getSessionSalt = function (string) {
    return SESSION_SALT_PREFIX + string + SESSION_SALT_POSTFIX;
};

/**
 * Возвращает соль со внедренной рандомной солью из параметра.
 * @param {String} salt Соль.
 * @param {String} random Рандомная строка.
 * @return {String} Соль с внедрением.
 */
exports.injectRandomSalt = function (salt, random) {
    var arraySalt = salt.split('');

    arraySalt.splice(5, 0, random);

    return arraySalt.join('') + random;
};

/**
 * Создает соленый пароль.
 * @param {String} login Логин.
 * @param {Function} callback Следующий шаг, куда передается пароль и его хэш.
 */
exports.makePass = function (login, callback) {
    var pass;
    var passTplSeed = login + NEW_PASS_SALT + login;

    Bcrypt.hash(passTplSeed, 3, function(error, passTpl) {
        if (error || !passTpl) {
            callback(false);
        } else {
            pass = passTpl.slice(7, 15);

            Bcrypt.hash(exports.getPassSalt(pass), 9, function(error, hash) {
                if (error || !hash) {
                    callback(false);
                } else {
                    callback(pass, hash);
                }
            });
        }
    });
};

/**
 * Создает соленую сессию.
 * @param {String} login Логин.
 * @param {Function} callback Следующий шаг, в который передается сессия и случайная соль.
 */
exports.makeSession = function (login, callback) {
    var loginSalt = exports.getSessionSalt(login);
    var randomSalt = String(Math.random() * Math.random());
    var resultSalt = exports.injectRandomSalt(loginSalt, randomSalt);

    Bcrypt.hash(resultSalt, 9, function(error, hash) {
        if (error || !hash) {
            callback(false);
        } else {
            callback(hash, randomSalt);
        }
    });
};

/**
 * Сопоставляет пароль и его соленый хэш.
 * @param {String} userPass Пароль пользователя.
 * @param {String} realPassHash Реальный хэш пароля.
 * @param {Function} callback Следующий шаг.
 */
exports.checkPass = function (userPass, realPassHash, callback) {
    var userPassSalt = Salt.getPassSalt(userPass);

    Bcrypt.compare(userPassSalt, realPassHash, function (error, result) {
        if (error || !result) {
            callback(false);
        } else {
            callback(true);
        }
    });
};
/**
 * Модуль работы с данными аккаутов.
 */
'use strict';

var Mongo = require('./Mongo');

/**
 * Получает аккаунт по логину.
 * @param {String} login Логин.
 * @param {String} type Тип аккаунта.
 * @param {Function} callback Следующий шаг.
 */
exports.getAccountByLogin = function (login, type, callback) {
    getAccountByProperties(
        {
            login: login
        },
        type,
        callback
    );
};

/**
 * Получает аккаунт по ключу сессии.
 * Не зависит от типа аккаунта.
 * @param {String} key Ключ сессии.
 * @param {Function} callback Следующий шаг, куда передается аккаунт и его тип.
 */
exports.getAccountByKey = function (key, callback) {
    var properties = {
        session: key
    };

    getAccountByProperties(properties, 'company', function (account) {
        if (account) {
            return callback(account, 'company');
        } else {
            getAccountByProperties(properties, 'partner', function (account) {
                if (account) {
                    return callback(account, 'partner');
                } else {
                    return callback(false);
                }
            });
        }
    });
};

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
            properties
        )
        .limit(1)
        .next(function (error, account) {
            if (error || !account) {
                return callback(false);
            } else {
                return callback(account);
            }
        });
}

/**
 * Удаляет из объекта данных аккаунта приватные данные.
 * @param {Object} account Объект данных аккаунта.
 */
exports.sanitiseAccountData = function (account) {
    delete account.login;
    delete account.pass;
    delete account.session;
    delete account.randomSalt;
};
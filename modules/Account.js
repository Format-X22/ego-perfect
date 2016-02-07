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
            callback(account, 'company');
        } else {
            getAccountByProperties(properties, 'partner', function (account) {
                if (account) {
                    callback(account, 'partner');
                } else {
                    callback(false);
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
                callback(false);
            } else {
                callback(account);
            }
        });
}
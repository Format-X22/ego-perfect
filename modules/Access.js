/**
 * Модуль проверки доступа к данным.
 */
'use strict';

var Mongo = require('./Mongo');
var Protocol = require('./Protocol');

var accessMap = {
    client: {
        client: true
    },
    partner: {
        partner: true
    }
};

/**
 * Проверка возможности доступа в указанной точке по запросу.
 * @param {String} point Точка доступа.
 * @param {Object} config Объект конфигурации.
 * @param {Function} config.callback Следующий шаг.
 * @param {Object} config.request Объект запроса сервера.
 * @param {Object} config.response Объект ответа сервера.
 */
exports.check = function (point, config) {
    getUserGroup(config.request, function (group) {
        var accessGranted = accessMap[point][group];

        if (accessGranted) {
            config.callback();
        } else {
            Protocol.sendAccessDenied(config.response);
        }
    });
};

/**
 * @private
 * @param {Object} request Объект запроса сервера.
 * @param {Function} callback Следующий шаг.
 */
function getUserGroup (request, callback) {
    callback('partner');
}
/**
 * Модуль сблюдения протокола общения со фронтендом.
 */
'use strict';

/**
 * Отправляет сообщение с данными.
 * @param {Object} response Объект ответа сервера
 * @param {Array} data Массив данных.
 */
exports.sendData = function (response, data) {
    send(response, data, true, '');
};

/**
 * Отправляет сообщение об ошибке.
 * @param {Object} response Объект ответа сервера.
 * @param {String} error Текст ошибки.
 */
exports.sendError = function (response, error) {
    send(response, [], false, error);
};

/**
 * @private
 * @param {Object} response Объект ответа сервера.
 * @param {Array} data Массив данных.
 * @param {Boolean} success успешен ли запрос.
 * @param {String} error Текст ошибки.
 */
function send (response, data, success, error) {
    response.json({
        data: data,
        success: success,
        error: error
    });
}
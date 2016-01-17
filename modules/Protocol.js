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
    response.json({
        data: data,
        success: true,
        error: ''
    });
};

/**
 * Отправляет сообщение об ошибке.
 * @param {Object} response Объект ответа сервера.
 * @param {String} error Текст ошибки.
 */
exports.sendError = function (response, error) {
    response.json({
        data: [],
        success: false,
        error: error
    });
};

/**
 * Отправляет сообщение об ошибке.
 * @param {Object} response Объект ответа сервера.
 */
exports.sendAccessDenied = function (response) {
    exports.sendError(response, 'Доступ запрещен!');
};
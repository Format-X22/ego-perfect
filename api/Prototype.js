/**
 * Набор базовых схожих методов апи.
 */
'use strict';

var Mongo = require('../modules/Mongo');
var Protocol = require('../modules/Protocol');

/**
 * Обертка над обычным методом роутера.
 * Позволяет сделать запрос сущности по её ID.
 * Также вызывает проверку доступа, ожидающую промис.
 * @param {String} collection Имя коллекции сущности.
 * @param {Function} accessControl Функция проверки доступа, возвращающая промис.
 * @return {Function} Готовый обработчик для роутера.
 */
exports.getById = function (collection, accessControl) {
    return function (request, response) {
        accessControl(request, response)
            .then(function () {
                getByIdIfAllOk(collection, request, response);
            })
            .catch(function () {
                Protocol.sendAccessDenied(response);
            });
    }
};

/**
 * @private
 * @param {String} collection Имя коллекции сущности.
 * @param {Object} request Объект запроса сервера.
 * @param {Object} response Объект ответа сервера.
 */
function getByIdIfAllOk (collection, request, response) {
    var id = request.query.id;
    var query = {
        _id: Mongo.objectID(id)
    };

    Mongo
        .collection(collection)
        .find(query)
        .toArray(function (error, data) {
            if (error) {
                Protocol.sendError(response, 'Невозможно получить данные!');
            } else {
                Protocol.sendData(response, data);
            }
        });
}
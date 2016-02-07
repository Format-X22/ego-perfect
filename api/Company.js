/**
 * Обеспечивает доступ к данным компаний для пользоваелей.
 */
'use strict';

var express = require('express');
var router = express.Router();
var Mongo = require('../modules/Mongo');
var Protocol = require('../modules/Protocol');

const SEARCH_DB_ERROR = 'Ошибка запроса к базе данных при поиске!';
const INVALID_ID = 'Не верный формат ID!';

router.get('/', function(request, response) {
    var id = request.query.id;
    var objectId;
    var excludeKeys = {
        login: 0,
        pass: 0,
        key: 0,
        partner: 0
    };

    try {
        objectId = Mongo.objectID(id)
    } catch (error) {
        return Protocol.sendError(response, INVALID_ID);
    }

    Mongo
        .collection('company')
        .find({
            search_id: objectId
        }, excludeKeys)
        .toArray(
            getEntitySender(response)
        );
});

/**
 * @private
 * @param {Object} response Объект ответа сервера.
 * @return {Function}
 * Функция, принимающая ошибку или набор данных
 * и отправляющая всё это на сервер.
 */
function getEntitySender (response) {
    return function (error, data) {
        if (error) {
            return Protocol.sendError(response, SEARCH_DB_ERROR);
        }

        return Protocol.sendData(response, data);
    }
}

module.exports = router;
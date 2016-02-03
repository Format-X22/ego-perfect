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
        login: -1,
        pass: -1,
        key: -1,
        partner: -1
    };

    try {
        objectId = Mongo.objectID(id)
    } catch (error) {
        Protocol.sendError(response, INVALID_ID);
        return;
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
            Protocol.sendError(response, SEARCH_DB_ERROR);
            return;
        }

        Protocol.sendData(response, data);
    }
}

module.exports = router;
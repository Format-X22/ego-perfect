/**
 * Обеспечивает доступ к данным партнеров.
 */
'use strict';

var express = require('express');
var router = express.Router();
var Access = require('../modules/Access');
var Mongo = require('../modules/Mongo');
var Protocol = require('../modules/Protocol');

/**
 * Получение данных по конкретному партнеру.
 */
router.get('/', function(request, response) {
    var id = request.query.id;

    Mongo
        .collection('partner')
        .find(
            {
                _id: Mongo.objectID(id)
            }
        )
        .toArray(function (error, data) {
            if (error) {
                Protocol.sendError(response, 'Невозможно получить данные!');
            } else {
                Protocol.sendData(response, data);
            }
        });
});

/**
 * Запрос на смену почты.
 */
router.post('/changeEmail', function (request, response) {
    var id = request.params.id;
    var email = request.params.email;

    //
});

/**
 * Запрос на сброс пароля.
 */
router.post('/resetPassword', function (request, response) {
    //
});

module.exports = router;
/**
 * Обеспечивает доступ к данным партнеров.
 */
'use strict';

var express = require('express');
var router = express.Router();
var Access = require('../modules/Access');
var Mongo = require('../modules/Mongo');
var Protocol = require('../modules/Protocol');
var Prototype = require('./Prototype');

/**
 * Получение данных по конкретному партнеру.
 */
router.get('/', Prototype.getById('partner', function () {
    return new Promise(function (resolve) {
        resolve();
    });
}));

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
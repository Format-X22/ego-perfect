/**
 * Обеспечивает доступ к данным клиентов.
 */
'use strict';

var express = require('express');
var router = express.Router();
var Access = require('../modules/Access');
var Mongo = require('../modules/Mongo');
var Protocol = require('../modules/Protocol');
var Prototype = require('./Prototype');

/**
 * Получение данных по конкретному клиенту.
 */
router.get('/', Prototype.getById('client', function () {
    return new Promise(function (resolve) {
        resolve();
    });
}));

module.exports = router;
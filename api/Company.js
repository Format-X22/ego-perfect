/**
 * Обеспечивает доступ к данным компаний для пользоваелей.
 */
'use strict';

var express = require('express');
var router = express.Router();
var Mongo = require('../modules/Mongo');
var Protocol = require('../modules/Protocol');
var Prototype = require('./Prototype');

/**
 * Получение данных по конкретной компании.
 */
router.get('/', Prototype.getById('company', function () {
    return new Promise(function (resolve) {
        resolve();
    });
}));

module.exports = router;
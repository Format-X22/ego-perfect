/**
 * Обеспечивает доступ к данным клиентов.
 */
'use strict';

var express = require('express');
var router = express.Router();
var Access = require('../modules/Access');
var Mongo = require('../modules/Mongo');
var Protocol = require('../modules/Protocol');

router.get('/', function(request, response) {
    response.send('Client');
});

module.exports = router;
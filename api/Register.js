/**
 * Обеспечивает процесс регистрации.
 */
'use strict';

var express = require('express');
var router = express.Router();
var Mongo = require('../modules/Mongo');
var Protocol = require('../modules/Protocol');

router.get('/', function(request, response) {
    response.send('Register');
});

module.exports = router;
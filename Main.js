/**
 * Основной модуль приложения.
 */
'use strict';

var Fn = require('./util/Fn');
var express = require('express');
var expressApp = express();
var pathModule = require('path');
var http = require('http');

Fn.queue([
    initDataBase,
    initExpress,
    initRouter,
    lunchServer
]);

/**
 * Инициализация базы.
 * @param {Function} next Следующий шаг.
 */
function initDataBase (next) {
    console.log('Init DB');
    next();
}

/**
 * Инициализация Экспресса.
 * @param {Function} next Следующий шаг.
 */
function initExpress (next) {
    console.log('Init Express');

    var bodyParser = require('body-parser');
    var publicDir = pathModule.join(__dirname, 'public');
    var extendedFlag = {
        extended: false
    };

    expressApp.use(bodyParser.json());
    expressApp.use(bodyParser.urlencoded(extendedFlag));
    expressApp.use(require('cookie-parser')());
    expressApp.use(express.static(publicDir));

    next();
}

/**
 * Инициализация роутера.
 * @param {Function} next Следующий шаг.
 */
function initRouter (next) {
    console.log('Init Router');

    expressApp.use('/api/search',   require('./api/Search'));
    expressApp.use('/api/company',  require('./api/Company'));
    expressApp.use('/api/auth',     require('./api/Auth'));
    expressApp.use('/api/register', require('./api/Register'));
    expressApp.use('/api/client',   require('./api/Client'));
    expressApp.use('/api/partner',  require('./api/Partner'));

    next();
}

/**
 * Запуск приложения.
 */
function lunchServer () {
    console.log('Lunch');

    var port = normalizePort(process.env.PORT) || 3000;

    http.createServer(expressApp).listen(port);
}

/**
 * @param value Значение порта.
 * @return {Number/Boolean} Номер порта числом, либо его алиас не числом, иначе false.
 */
function normalizePort (value) {
    var port = parseInt(value, 10);

    if (isNaN(port)) {
        return value;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
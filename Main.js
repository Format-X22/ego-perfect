'use strict';

var Fn = require('./util/Fn');
var express = require('express');

/**
 * Основной класс приложения.
 */
class Main {
    constructor () {
        Fn.queue([
            this.initDataBase,
            this.initExpress,
            this.initRouter,
            this.lunchServer
        ], this);
    }

    /**
     * Инициализация базы.
     * @param {Function} next Следующий шаг.
     */
    initDataBase (next) {
        console.log('initDB');
        next();
    }

    /**
     * Инициализация Экспресса.
     * @param {Function} next Следующий шаг.
     */
    initExpress (next) {
        console.log('initExpress');
        next();
    }

    /**
     * Инициализация роутера.
     * @param {Function} next Следующий шаг.
     */
    initRouter (next) {
        console.log('initRouter');
        next();
    }

    /**
     * Запуск приложения.
     */
    lunchServer () {
        console.log('lunch');
    }
}

new Main();
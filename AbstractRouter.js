/**
 * Абстрактный роутер обработки входящих запросов.
 * Способен обрабатывать как конкретные запросы,
 * так и переадресовывать запросы другим роутерам.
 *
 *
 * Для задания карты роутинга необходимо заполнить
 * объект конфигурации map в таком виде:
 *
 *      map: {
 *          'urlPath': {
 *              'methodName': 'handlerAsString or linkToFunction'
 *          }
 *      }
 *
 *
 * Для задания карты переадресации необходимо заполнить
 * объект конфигурации delegate в таком виде:
 *
 *      delegate: {
 *          'urlPath': 'routerClassNameAsString'
 *      }
 *
 *
 * *Порядок ссылок имеет значение.*
 * Если в начале указать слишком общую ссылку - следующие ниже ссылки
 * не будут обработаны т.к. соответствие паттерну запроса было найдено раньше.
 * Ссылки делегирования обрабатываются в конце.
 */
Ext.define('B.AbstractRouter', {

    config: {

        map: null,

        delegate: null,

        expressRouter: null
    },

    constructor: function (config) {
        var express = A.Main.getExpress();

        Ext.apply(this.config, config);
        this.initConfig(this.config);
        this.setExpressRouter(express.Router());
        this.initMap();
        this.initDelegate();
    },

    initMap: function () {
        Ext.Object.each(this.getMap(), function (key, value) {
            //
        }, this);
    },

    initDelegate: function () {
        Ext.Object.each(this.getDelegate(), function (key, value) {
            //
        }, this);
    }
});
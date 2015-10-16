'use strict';

/**
 * @class App
 * Основной класс приложения.
 * Содержит базовую конфигурацию.
 */
class App {
    constructor () {

        /**
         * @const
         * @property {String} ROUTES_PATH Путь до роутеров.
         */
        this.ROUTES_PATH = './routes/';

        /**
         * @property {Object} express Основной объект модуля express.
         */
        this.express = require('express');

        /**
         * @property {Object} expressApp Приложение фреймворка ExpressJS.
         */
        this.expressApp = this.express();

        this.configureApp();
        this.initRouteMap();
        this.catch404();
    }

    /**
     * @private
     */
    configureApp () {
        var app = this.expressApp;
        var path = require('path');
        var bodyParser = require('body-parser');

        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'jade');
        //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); @TODO
        app.use(require('morgan')('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(require('cookie-parser')());
        app.use(require('less-middleware')(path.join(__dirname, 'public')));
        app.use(this.express.static(path.join(__dirname, 'public')));
    }

    /**
     * @private
     */
    initRouteMap () {
        var app = this.expressApp;
        var prefix = this.ROUTES_PATH;

        app.use('/company',      require(prefix + 'company'));
        app.use('/clientAdmin',  require(prefix + 'clientAdmin'));
        app.use('/partnerAdmin', require(prefix + 'partnerAdmin'));
        app.use('/partner',      require(prefix + 'myAdmin'));
        app.use('/',             require(prefix + 'search'));
    }

    /**
     * @private
     */
    catch404 () {
        this.expressApp.use(function(request, response) {
            var error = new Error('Not Found');

            error.status = 404;
            response.status(error.status);
            this.renderError(error, response);
        }.bind(this));
    }

    /**
     * @private
     * @param {Error} error Объект ошибки.
     * @param {Object} response Объект ответа сервера.
     */
    renderError (error, response) {
        var errorObject = {};

        if (this.expressApp.get('env') === 'development') {
            errorObject = error;
        }

        response.render('page404', {
            message: error.message,
            error: errorObject
        });
    }
}

module.exports = App;
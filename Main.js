/**
 * Основной класс приложения.
 */
Ext.define('B.Main', {
    singleton: true,

    requires: [
        'B.Mongo',
        'B.MainRouter',
        'B.util.Function'
    ],

    config: {

        /**
         * @cfg {Object} express Модуль Express.
         */
        express: require('express'),

        /**
         * @cfg {Object} expressApp Приложение Express.
         */
        expressApp: null
    },

    constructor: function () {
        this.initConfig(this.config);
        this.setExpressApp(this.getExpress()());

        B.util.Function.queue([
            this.initDataBase,
            this.initExpress,
            this.initRouter,
            this.launchServer
        ], this);
    },

    /**
     * Инициализация базы.
     * @param {Function} next Следующий шаг.
     */
    initDataBase: function (next) {
        this.log('Init Mongo');

        B.Mongo.connect(next);
    },

    /**
     * Инициализация Экспресса.
     * @param {Function} next Следующий шаг.
     */
    initExpress: function (next) {
        this.log('Init Express');

        var bodyParser = require('body-parser');
        var jsonParser = bodyParser.json();
        var urlParser = bodyParser.urlencoded({
            extended: false
        });
        var cookieParser = require('cookie-parser')();
        var publicDir = require('path').join(__dirname, 'public');
        var staticDirSign = this.getExpress().static(publicDir);
        var app = this.getExpressApp();

        app.use(jsonParser);
        app.use(urlParser);
        app.use(cookieParser);
        app.use(staticDirSign);

        next();
    },

    /**
     * Инициализация роутера.
     * @param {Function} next Следующий шаг.
     */
    initRouter: function (next) {
        this.log('Init Router');

        Ext.create('B.MainRouter', {
            callback: next
        });
    },

    /**
     * Запуск приложения.
     */
    launchServer: function () {
        this.log('Launch');

        var port = this.normalizePort(process.env.PORT) || 3000;

        require('http').createServer(this.getExpressApp()).listen(port);
    },

    privates: {

        /**
         * @private
         * @param value Значение порта.
         * @return {Number/Boolean} Номер порта числом, либо его алиас не числом, иначе false.
         */
        normalizePort: function (value) {
            var port = parseInt(value, 10);

            if (isNaN(port)) {
                return value;
            }
            if (port >= 0) {
                return port;
            }
            return false;
        },

        /**
         * @private
         * @param {String} msg Сообщение.
         */
        log: function (msg) {
            Ext.log({
                level: 'info',
                msg: msg
            });
        }
    }
});
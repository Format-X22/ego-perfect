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
		this.ROUTES_PATH = './pages/';

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
		var bodyParser = require('body-parser');
		var publicDir = this.getPath('public');
		var viewsDir = this.getPath('views');
		var extendedFlag = {
			extended: false
		};

		app.set('views', viewsDir);
		app.set('view engine', 'jade');
		//app.use(favicon(this.getPath('public', 'favicon.ico'))); @TODO
		app.use(require('morgan')('dev'));
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded(extendedFlag));
		app.use(require('cookie-parser')());
		app.use(this.express.static(publicDir));
	}

	/**
	 * @private
	 * @param {String} path Необходимый локальный путь.
	 * @param {String} [concrete] Точное имя файла.
	 */
	getPath (path, concrete) {
		var pathModule = require('path');

		if (concrete) {
			return pathModule.join(__dirname, path, concrete);
		}
		return pathModule.join(__dirname, path);
	}

	/**
	 * @private
	 */
	initRouteMap () {
		var app = this.expressApp;
		var prefix = this.ROUTES_PATH;

		app.use('/admin',   require(prefix + 'admin'));
		app.use('/partner', require(prefix + 'partner'));
		app.use('/client',	require(prefix + 'client'));
		app.use('/',		require(prefix + 'root'));
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
/**
 * Роутер логики данных клиентов.
 * Использует модели авторизации.
 */
Ext.define('B.biz.client.Router', {
    extend: 'B.AbstractRouter',

	requires: [
		'B.biz.auth.model.Key',
		'B.biz.client.AccountData',
		'B.biz.client.BasicData',
		'B.biz.client.Summary',
		'B.biz.client.Photo',
		'B.biz.client.Words',
		'B.biz.client.model.BasicData',
		'B.biz.client.model.Summary',
		'B.biz.client.model.Photo',
		'B.biz.client.model.Words'
	],

    map: {
		'/': {
			get: 'getAccountData'
		},
		'/basic': {
			post: 'saveBasic'
		},
		'/summary': {
			post: 'saveSummary'
		},
		'/photo': {
			post: 'savePhoto'
		},
		'/words': {
			post: 'saveWords'
		}
	},

	/**
	 * Получение данных аккаунта.
	 * @param {Object} request Express объект запроса сервера.
	 * @param {Object} response Express объект ответа сервера.
	 */
	getAccountData: function (request, response) {
		var model = Ext.create('B.biz.auth.model.Key');

		model.set({
			key: request.cookies.key
		});

		if (this.checkRequestModel(model, response)) {
			Ext.create('B.biz.client.AccountData', {
				expressRequest: request,
				expressResponse: response,
				requestModel: model
			});
		}
	},

	/**
	 * Сохранение базовых данных.
	 * @param {Object} request Express объект запроса сервера.
	 * @param {Object} response Express объект ответа сервера.
	 */
	saveBasic: function (request, response) {
		var model = Ext.create('B.biz.client.model.BasicData');

		model.set({
			//
		});

		if (this.checkRequestModel(model, response)) {
			Ext.create('B.biz.client.BasicData', {
				expressRequest: request,
				expressResponse: response,
				requestModel: model
			});
		}
	},

	/**
	 * Сохранение данных саммори.
	 * @param {Object} request Express объект запроса сервера.
	 * @param {Object} response Express объект ответа сервера.
	 */
	saveSummary: function (request, response) {
		var model = Ext.create('B.biz.client.model.Summary');

		model.set({
			//
		});

		if (this.checkRequestModel(model, response)) {
			Ext.create('B.biz.client.Summary', {
				expressRequest: request,
				expressResponse: response,
				requestModel: model
			});
		}
	},

	/**
	 * Сохранение фото.
	 * @param {Object} request Express объект запроса сервера.
	 * @param {Object} response Express объект ответа сервера.
	 */
	savePhoto: function (request, response) {
		var model = Ext.create('B.biz.client.model.Photo');

		model.set({
			//
		});

		if (this.checkRequestModel(model, response)) {
			Ext.create('B.biz.client.Photo', {
				expressRequest: request,
				expressResponse: response,
				requestModel: model
			});
		}
	},

	/**
	 * Сохранение ключевых слов.
	 * @param {Object} request Express объект запроса сервера.
	 * @param {Object} response Express объект ответа сервера.
	 */
	saveWords: function (request, response) {
		var model = Ext.create('B.biz.client.model.Words');

		model.set({
			//
		});

		if (this.checkRequestModel(model, response)) {
			Ext.create('B.biz.client.Words', {
				expressRequest: request,
				expressResponse: response,
				requestModel: model
			});
		}
	}
});
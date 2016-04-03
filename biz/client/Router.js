/**
 * Роутер логики данных клиентов.
 */
Ext.define('B.biz.client.Router', {
    extend: 'B.AbstractRouter',

	requires: [
		'B.biz.client.AccountData',
		'B.biz.client.BasicData',
		'B.biz.client.Summary',
		'B.biz.client.Photo',
		'B.biz.client.Words',
		'B.biz.client.model.AccountData',
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
		var model = Ext.create('B.biz.client.model.AccountData');

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
		var params = request.body;

		model.set({
			key:     request.cookies.key,
			name:    params.name,
			phone:   params.phone,
			site:    params.site,
			email:   params.email,
			time:    params.time,
			address: params.address,
			map:     params.map
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
			key:     request.cookies.key,
			summary: request.body.summary
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
            key: request.cookies.key
        });

		if (this.checkRequestModel(model, response)) {
			Ext.create('B.biz.client.Photo', {
				expressRequest: request,
				expressResponse: response,
				requestModel: model,
                busboy: request.busboy
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
		var params = request.body;

		model.set({
			key:    request.cookies.key,
			word1:  params.word1,
			word2:  params.word2,
			word3:  params.word3,
			word4:  params.word4,
			word5:  params.word5,
			word6:  params.word6,
			word7:  params.word7,
			word8:  params.word8,
			word9:  params.word9,
			word10: params.word10
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
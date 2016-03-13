/**
 * Роутер логики данных партнеров.
 * Использует модели авторизации.
 */
Ext.define('B.biz.partner.Router', {
    extend: 'B.AbstractRouter',

	requires: [
		'B.biz.auth.model.Key',
		'B.biz.partner.AccountData'
	],

	map: {
		'/': {
			get: 'getAccountData'
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
			Ext.create('B.biz.partner.AccountData', {
				expressRequest: request,
				expressResponse: response,
				requestModel: model
			});
		}
	}
});
/**
 * Роутер логики данных партнеров.
 */
Ext.define('B.biz.partner.Router', {
    extend: 'B.AbstractRouter',

	requires: [
		'B.biz.partner.AccountData',
		'B.biz.partner.AccountDataModel'
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
		var model = Ext.create('B.biz.partner.AccountDataModel');

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
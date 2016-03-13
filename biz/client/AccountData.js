/**
 * Логика получения данных клиента.
 */
Ext.define('B.biz.client.AccountData', {
	extend: 'B.AbstractRequestHandler',

	requires: [
		'B.biz.auth.util.Account'
	],

	constructor: function () {
		this.callParent(arguments);

		Ext.create('B.biz.auth.util.Account', {
			key: this.getRequestModel().get('key'),
			type: 'company',
			scope: this,
			callback: function (acc) {
				var data = acc.getPrivateAccountData();

				if (data) {
					this.getProtocol().sendData(data);
				} else {
					this.sendError('Данные указанного аккаунта не найдены!');
				}
			}
		});
	}
});
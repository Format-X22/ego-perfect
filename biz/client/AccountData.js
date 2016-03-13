/**
 * Логика получения данных клиента.
 */
Ext.define('B.biz.client.AccountData', {
	extend: 'B.AbstractRequestHandler',

	constructor: function () {
		this.callParent(arguments);
		this.getProtocol().sendSuccess();
	}
});
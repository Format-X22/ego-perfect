/**
 * Логика сохранения саммори клиента.
 */
Ext.define('B.biz.client.Summary', {
	extend: 'B.AbstractRequestHandler',

	constructor: function () {
		this.callParent(arguments);
		this.getProtocol().sendSuccess();
	}
});
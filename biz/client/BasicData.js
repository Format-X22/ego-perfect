/**
 * Логика сохранения базовых данных клиента.
 */
Ext.define('B.biz.client.BasicData', {
	extend: 'B.AbstractRequestHandler',

	constructor: function () {
		this.callParent(arguments);
		this.getProtocol().sendSuccess();
	}
});
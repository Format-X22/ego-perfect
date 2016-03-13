/**
 * Логика сохранения фото клиента.
 */
Ext.define('B.biz.client.Photo', {
	extend: 'B.AbstractRequestHandler',

	constructor: function () {
		this.callParent(arguments);
		this.getProtocol().sendSuccess();
	}
});
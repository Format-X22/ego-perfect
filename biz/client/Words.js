/**
 * Логика сохранения ключевых слов клиента.
 */
Ext.define('B.biz.client.Words', {
	extend: 'B.AbstractRequestHandler',

	constructor: function () {
		this.callParent(arguments);
		this.getProtocol().sendSuccess();
	}
});
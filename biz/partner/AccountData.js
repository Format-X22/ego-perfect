/**
 * Логика получения данных партнера.
 */
Ext.define('B.biz.partner.AccountData', {
	extend: 'B.AbstractRequestHandler',

	constructor: function () {
		this.callParent(arguments);
		this.getProtocol().sendSuccess();
	}
});
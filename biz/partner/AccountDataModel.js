/**
 * Модель запроса данных партнера.
 */
Ext.define('B.biz.partner.AccountDataModel', {
	extend: 'Ext.data.Model',

	fields: [
		{
			name: 'key',
			type: 'string',
			validators: {
				type: 'presence'
			}
		}
	]
});
/**
 * Модель запроса данных клиента.
 */
Ext.define('B.biz.client.model.AccountData', {
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
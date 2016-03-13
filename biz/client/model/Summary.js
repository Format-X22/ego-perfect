/**
 * Модель саммори клиента.
 */
Ext.define('B.biz.client.model.Summary', {
	extend: 'Ext.data.Model',

	fields: [
		{
			name: 'key',
			type: 'string',
			validators: {
				type: 'presence'
			}
		},
		{
			name: 'summary',
			type: 'string',
			validators: {
				type: 'length',
				max: 2000
			}
		}
	]
});
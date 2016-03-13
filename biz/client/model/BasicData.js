/**
 * Модель базовых данных клиента.
 */
Ext.define('B.biz.client.model.BasicData', {
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
			name: 'name',
			type: 'string',
			validators: {
				type: 'length',
				min: 1,
				max: 100
			}
		},
		{
			name: 'phone',
			type: 'string',
			validators: {
				type: 'length',
				min: 0,
				max: 200
			}
		},
		{
			name: 'site',
			type: 'string',
			validators: {
				type: 'length',
				min: 0,
				max: 200
			}
		},
		{
			name: 'email',
			type: 'string',
			validators: {
				type: 'length',
				min: 0,
				max: 200
			}
		},
		{
			name: 'time',
			type: 'string',
			validators: {
				type: 'length',
				min: 0,
				max: 200
			}
		},
		{
			name: 'address',
			type: 'string',
			validators: {
				type: 'length',
				min: 0,
				max: 200
			}
		},
		{
			name: 'map',
			validators: {
				type: 'length',
				min: 8,
				max: 100
			},
			convert: function (value) {
				if (!value) {
					return null;
				}

				value = value
					.trim()
					.replace(/@/g, '')
					.replace(/[ ]+/g, ' ');

				if (/^\d+.\d+, \d+.\d+$/.test(value)) {
					return value;
				} else {
					return null;
				}
			}
		}
	]
});
/**
 * Модель размещения компании клиента.
 */
Ext.define('B.biz.client.model.Release', {
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
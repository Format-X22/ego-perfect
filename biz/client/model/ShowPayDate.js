/**
 * Модель запроса данных даты оплаты клиента.
 */
Ext.define('B.biz.client.model.ShowPayDate', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'login',
            type: 'string',
            validators: {
                type: 'presence'
            }
        }
    ]
});
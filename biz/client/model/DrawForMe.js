/**
 * Модель запроса бесплатного логотипа.
 */
Ext.define('B.biz.client.model.DrawForMe', {
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
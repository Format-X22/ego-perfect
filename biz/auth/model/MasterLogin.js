/**
 * Модель запроса входа используя мастер-логин.
 */
Ext.define('B.biz.auth.model.MasterLogin', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id',
            type: 'mongoId'
        }
    ]
});
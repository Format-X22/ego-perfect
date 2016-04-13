/**
 * Базовая модель запросов авторизационных действий.
 */
Ext.define('B.biz.auth.model.Base', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'login',
            type: 'string'
        },
        {
            name: 'pass',
            type: 'string'
        },
        {
            name: 'type',
            type: 'string'
        },
        {
            name: 'captcha',
            type: 'string'
        },
        {
            name: 'partner',
            type: 'mongoId',
            validators: null
        },
        {
            name: 'discount',
            type: 'mongoId',
            validators: null
        },
        {
            name: 'key',
            type: 'string'
        }
    ]
});
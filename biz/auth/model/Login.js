/**
 * Модель запроса входа.
 */
Ext.define('B.biz.auth.model.Login', {
    extend: 'B.biz.auth.model.Base',

    validators: {
        login: {
            type: 'presence'
        },
        pass: {
            type: 'presence'
        },
        type: {
            type: 'inclusion',
            list: ['company', 'partner']
        }
    }
});
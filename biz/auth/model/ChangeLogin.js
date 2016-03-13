/**
 * Модель запроса смены логина.
 */
Ext.define('B.biz.auth.model.ChangeLogin', {
    extend: 'B.biz.auth.model.Base',

    validators: {
        login: {
            type: 'presence'
        },
        key: {
            type: 'presence'
        }
    }
});
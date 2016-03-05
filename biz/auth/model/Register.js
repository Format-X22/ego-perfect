/**
 * Модель запроса регистрации.
 */
Ext.define('B.biz.auth.model.Register', {
    extend: 'B.biz.auth.model.Base',

    validators: {
        login: {
            type: 'presence'
        },
        partner: {
            type: 'presence'
        },
        type: {
            type: 'presence'
        },
        captcha: {
            type: 'presence'
        }
    }
});
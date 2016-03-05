/**
 * Модел запроса восстановления пароля.
 */
Ext.define('B.biz.auth.model.RestorePass', {
    extend: 'B.biz.auth.model.Base',

    validators: {
        login: {
            type: 'presence'
        },
        type: {
            type: 'presence'
        }
    }
});
/**
 * Модель запроса с ключем.
 */
Ext.define('B.biz.auth.model.Key', {
    extend: 'B.biz.auth.model.Base',

    validators: {
        key: {
            type: 'presence'
        }
    }
});
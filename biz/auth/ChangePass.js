/**
 * Логика смены пароля.
 */
Ext.define('B.biz.auth.ChangePass', {
    extend: 'B.AbstractRequestHandler',

    constructor: function () {
        this.callParent(arguments);
        this.getProtocol().sendSuccess();
    }
});
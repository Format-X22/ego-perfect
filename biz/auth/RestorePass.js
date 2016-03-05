/**
 * Логика восстановления пароля.
 */
Ext.define('B.biz.auth.RestorePass', {
    extend: 'B.AbstractRequestHandler',

    constructor: function () {
        this.callParent(arguments);
        this.getProtocol().sendSuccess();
    }
});
/**
 * Логика подтверждения восстановления пароля.
 */
Ext.define('B.biz.auth.ConfirmRestorePass', {
    extend: 'B.AbstractRequestHandler',

    constructor: function () {
        this.callParent(arguments);
        this.getProtocol().sendSuccess();
    }
});
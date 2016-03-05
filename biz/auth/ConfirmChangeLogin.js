/**
 * Логика подтверждения смены логина.
 */
Ext.define('B.biz.auth.ConfirmChangeLogin', {
    extend: 'B.AbstractRequestHandler',

    constructor: function () {
        this.callParent(arguments);
        this.getProtocol().sendSuccess();
    }
});
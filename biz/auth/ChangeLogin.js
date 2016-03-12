/**
 * Логика смены логина.
 */
Ext.define('B.biz.auth.ChangeLogin', {
    extend: 'B.AbstractRequestHandler',

    constructor: function () {
        this.callParent(arguments);
        this.getProtocol().sendSuccess();
    }
});
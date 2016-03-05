/**
 * Логика регистрации.
 */
Ext.define('B.biz.auth.Register', {
    extend: 'B.AbstractRequestHandler',

    constructor: function () {
        this.callParent(arguments);
        this.getProtocol().sendSuccess();
    }
});
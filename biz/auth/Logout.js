/**
 * Логика выхода из сайта.
 */
Ext.define('B.biz.auth.Logout', {
    extend: 'B.AbstractRequestHandler',

    constructor: function () {
        this.callParent(arguments);
        this.getProtocol().sendSuccess();
    }
});
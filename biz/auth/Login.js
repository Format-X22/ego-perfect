/**
 * Логика входа на сайт.
 */
Ext.define('B.biz.auth.Login', {
    extend: 'B.AbstractRequestHandler',

    constructor: function () {
        this.callParent(arguments);
        this.getProtocol().sendSuccess();
    }
});
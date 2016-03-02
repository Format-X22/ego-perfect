/**
 * Поисковый механизм.
 */
Ext.define('B.biz.search.Search', {
    extend: 'B.AbstractRequestHandler',

    constructor: function () {
        this.callParent(arguments);
        this.getProtocol().sendSuccess();
    }
});
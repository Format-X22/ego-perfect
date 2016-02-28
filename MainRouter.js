/**
 * Главный роутер приложения.
 */
Ext.define('B.MainRouter', {
    extend: 'B.AbstractRouter',

    requires: [
        'B.biz.search.Router',
        'B.biz.company.Router',
        'B.biz.reviews.Router',
        'B.biz.auth.Router',
        'B.biz.client.Router',
        'B.biz.partner.Router'
    ],

    delegate: {
        '/api/search':  'B.biz.search.Router',
        '/api/company': 'B.biz.company.Router',
        '/api/reviews': 'B.biz.reviews.Router',
        '/api/auth':    'B.biz.auth.Router',
        '/api/client':  'B.biz.client.Router',
        '/api/partner': 'B.biz.partner.Router'
    },

    config: {
        callback: null
    },

    constructor: function () {
        this.callParent(arguments);
        this.getCallback()();
    }
});
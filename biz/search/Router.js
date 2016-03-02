/**
 * Роутер логики поиска.
 */
Ext.define('B.biz.search.Router', {
    extend: 'B.AbstractRouter',

    requires: [
        'B.biz.search.Search',
        'B.biz.search.SearchModel'
    ],

    map: {
        '/': {
            get: 'search'
        }
    },

    search: function (request, response) {
        var model = Ext.create('B.biz.search.SearchModel');
        var params = request.query;

        model.set({
            query: params.query,
            start: params.start,
            limit: params.limit
        });

        Ext.create('B.biz.search.Search', {
            expressRequest: request,
            expressResponse: response
        });
    }
});
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

    /**
     * Обработчик запроса поиска.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
    search: function (request, response) {
        var model = Ext.create('B.biz.search.SearchModel');
        var params = request.query;
        var cookie = request.cookies;

        model.set({
            query: params.query,
            start: params.start,
            limit: params.limit,
            lat: cookie.lat,
            lng: cookie.lng
        });

        if (this.checkRequestModel(model, response)) {
            Ext.create('B.biz.search.Search', {
                expressRequest: request,
                expressResponse: response,
                requestModel: model
            });
        }
    }
});
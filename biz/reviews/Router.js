/**
 * Роутер логики отзывов.
 */
Ext.define('B.biz.reviews.Router', {
    extend: 'B.AbstractRouter',

    requires: [
        'B.biz.reviews.Get',
        'B.biz.reviews.model.Get',
        'B.biz.reviews.Save',
        'B.biz.reviews.model.Save'
    ],

    map: {
        '/': {
            get: 'getReviews',
            post: 'saveReview'
        }
    },

    /**
     * Обработчик запроса получения списка отзывов.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
     getReviews: function (request, response) {
        var model = Ext.create('B.biz.reviews.model.Get');

        model.set({
            id: request.query.id
        });

        if (this.checkRequestModel(model, response)) {
            Ext.create('B.biz.reviews.Get', {
                expressRequest: request,
                expressResponse: response,
                requestModel: model
            });
        }
    },

    /**
     * Обработчик запроса сохранения отзывов.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
    saveReview: function (request, response) {
        var model = Ext.create('B.biz.reviews.model.Save');
        var params = request.body;

        model.set({
            id: params.id,
            name: params.name,
            header: params.header,
            description: params.description,
            rating: params.rating
        });

        if (this.checkRequestModel(model, response)) {
            Ext.create('B.biz.reviews.Save', {
                expressRequest: request,
                expressResponse: response,
                requestModel: model
            });
        }
    }
});
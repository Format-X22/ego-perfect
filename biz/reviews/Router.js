/**
 * Роутер логики отзывов.
 */
Ext.define('B.biz.reviews.Router', {
    extend: 'B.AbstractRouter',

    requires: [
        'B.biz.reviews.Reviews',
        'B.biz.reviews.ReviewsModel'
    ],

    map: {
        '/': {
            post: 'saveReview'
        }
    },

    /**
     * Обработчик запроса получения данных компании.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
    saveReview: function (request, response) {
        var model = Ext.create('B.biz.reviews.ReviewsModel');
        var params = request.body;

        model.set({
            id: params.id,
            name: params.name,
            header: params.header,
            description: params.description,
            captcha: params.captcha,
            rating: params.rating
        });

        if (this.checkRequestModel(model, response)) {
            Ext.create('B.biz.reviews.Reviews', {
                expressRequest: request,
                expressResponse: response,
                requestModel: model
            });
        }
    }
});
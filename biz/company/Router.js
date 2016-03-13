/**
 * Роутер логики публичных данных компании.
 */
Ext.define('B.biz.company.Router', {
    extend: 'B.AbstractRouter',

    requires: [
        'B.biz.company.Company',
        'B.biz.company.CompanyModel'
    ],

    map: {
        '/': {
            get: 'getCompany'
        }
    },

    /**
     * Обработчик запроса получения данных компании.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
    getCompany: function (request, response) {
        var model = Ext.create('B.biz.company.CompanyModel');

        model.set({
            id: request.query.id
        });

        if (this.checkRequestModel(model, response)) {
            Ext.create('B.biz.company.Company', {
                expressRequest: request,
                expressResponse: response,
                requestModel: model
            });
        }
    }
});
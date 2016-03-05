/**
 * Логика получения публичных данных компании.
 */
Ext.define('B.biz.company.Company', {
    extend: 'B.AbstractRequestHandler',

    constructor: function () {
        this.callParent(arguments);

        var id = this.getRequestModel().get('id');

        B.Mongo
            .getCollection('company')
            .find(
                {
                    search_id: id
                },
                {
                    login: 0,
                    pass: 0,
                    key: 0,
                    partner: 0
                }
            )
            .toArray(
                this.sendResponse.bind(this)
            );
    },

    privates: {

        /**
         * @private
         * @param {Object} error Объект ошибки.
         * @param {Object[]} data Набор данных.
         */
        sendResponse: function (error, data) {
            var errorText = B.Mongo.getRequestErrorText();

            if (error) {
                this.getProtocol().sendError(errorText);
            } else {
                this.getProtocol().sendData(data);
            }
        }
    }
});
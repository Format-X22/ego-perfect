/**
 * Получение списка отзывов.
 */
Ext.define('B.biz.reviews.Get', {
    extend: 'B.AbstractRequestHandler',

    constructor: function () {
        this.callParent(arguments);

        B.Mongo
            .getCollection('company')
            .findOne(
                {
                    _id: this.getMongoId()
                },
                {
                    reviews: 1
                },
                this.sendResponse.bind(this)
            );
    },

    privates: {

        /**
         * @private
         * @return {Mongo.ObjectID} ID документа базы.
         */
        getMongoId: function () {
            var id = this.getRequestModel().get('id');

            return B.Mongo.makeId(id);
        },

        /**
         * @private
         * @param {Object} error Объект ошибки.
         * @param {Object} document Результат запроса.
         */
        sendResponse: function (error, document) {
            var errorText = B.Mongo.getRequestErrorText();

            if (error) {
                this.getProtocol().sendError(errorText);
            } else {
                this.getProtocol().sendData(document.reviews);
            }
        }
    }
});

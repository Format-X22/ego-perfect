/**
 * Сохранение отзывов.
 */
Ext.define('B.biz.reviews.Save', {
    extend: 'B.AbstractRequestHandler',

    constructor: function () {
        this.callParent(arguments);

        var model = this.getRequestModel();

        B.Mongo
            .getCollection('company')
            .findOneAndUpdate(
                {
                    _id: this.getMongoId()
                },
                {
                    $push: {
                        reviews: {
                            name:        model.get('name'),
                            header:      model.get('header'),
                            description: model.get('description'),
                            rating:      model.get('rating'),
                            date:        this.getDate()
                        }
                    },
                    $inc: {
                        rating: model.get('rating') * 20
                    }
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
         * @return {String} Форматированная текущая дата.
         */
        getDate: function () {
            return Ext.Date.format(new Date(), 'd.m.Y');
        },

        /**
         * @private
         * @param {Object} error Объект ошибки.
         * @param {Object} result Результат запроса.
         */
        sendResponse: function (error, result) {
            var errorText = B.Mongo.getRequestErrorText();
            var document = result.value;

            if (error || !document) {
                this.getProtocol().sendError(errorText);
            } else {
                this.getProtocol().sendData(document.reviews);
            }
        }
    }
});

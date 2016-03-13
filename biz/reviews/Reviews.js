/**
 * Сохранение отзывов.
 */
Ext.define('B.biz.reviews.Reviews', {
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
                            captcha:     model.get('captcha'),
                            rating:      model.get('rating'),
                            date:        this.getDate()
                        }
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
         */
        sendResponse: function (error) {
            var errorText = B.Mongo.getRequestErrorText();

            if (error) {
                this.getProtocol().sendError(errorText);
            } else {
                this.getProtocol().sendSuccess();
            }
        }
    }
});

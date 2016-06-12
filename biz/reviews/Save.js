/**
 * Сохранение отзывов.
 */
Ext.define('B.biz.reviews.Save', {
    extend: 'B.AbstractRequestHandler',

    constructor: function () {
        this.callParent(arguments);

        var model = this.getRequestModel();
        var mongo = Ext.create('B.mongo.Company', {
            atomic: true,
            id: model.get('id'),
            scope: this,
            success: this.sendReviewsIfFoundAndNotifyClient,
            failure: this.sendError,
            value: {
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
            }
        });

        mongo.updateCompany();
    },

    privates: {

        /**
         * @private
         * @param {Object} result Результат запроса.
         */
        sendReviewsIfFoundAndNotifyClient: function (result) {
            var doc = result.value;

            if (doc) {
                this.sendData(doc.reviews);

                Ext.create('B.Mail', {
                    login: doc.login
                }).notifyClientAboutReview(doc._id);
            } else {
                this.sendError();
            }
        },

        /**
         * @private
         */
        sendError: function () {
            this.callParent(['Ошибка при добавлении отзыва.']);
        },

        /**
         * @private
         * @return {String} Форматированная текущая дата.
         */
        getDate: function () {
            return Ext.Date.format(new Date(), 'd.m.Y');
        }
    }
});

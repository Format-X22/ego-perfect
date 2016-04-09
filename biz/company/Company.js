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
            .findOneAndUpdate(
                {
                    _id: B.Mongo.makeId(id)
                },
                {
                    $inc: {
						views: 1,
						rating: 1
					}
                },
                {
                    projection: {
                        rating: 1,
                        reviews: 1,
                        name: 1,
                        phone: 1,
                        site: 1,
                        email: 1,
                        time: 1,
                        address: 1,
                        map: 1,
                        summary: 1
                    }
                },
				this.sendResponse.bind(this)
            );
    },

    privates: {

        /**
         * @private
         * @param {Object} error Объект ошибки.
         * @param {Object[]} result Результат.
         */
        sendResponse: function (error, result) {
            var errorText = B.Mongo.getRequestErrorText();

            if (error) {
                this.getProtocol().sendError(errorText);
            } else {
                this.getProtocol().sendData(result.value);
            }
        }
    }
});
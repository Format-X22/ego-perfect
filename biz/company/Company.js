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
                    search_id: id
                },
                {
                    $inc: {
						views: 1,
						rating: 1
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
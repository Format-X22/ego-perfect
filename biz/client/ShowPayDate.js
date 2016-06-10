/**
 * Логика получения данных даты оплаты клиента.
 */
Ext.define('B.biz.client.AccountData', {
    extend: 'B.AbstractRequestHandler',

    requires: [
        'B.biz.auth.util.Account'
    ],

    constructor: function () {
        this.callParent(arguments);

        var collection = Ext.create('B.mongo.Company').getCollection();

        collection.findOne(
            {
                login: this.getRequestModel().get('login')
            },
            {
                _id: false,
                payDate: true
            },
            this.sendSearchResult.bind(this)
        )
    },

    privates: {

        /**
         * @private
         * @param {Object/Null} error Объект ошибки или null.
         * @param {Object/Null} doc Результирующий документ или null.
         */
        sendSearchResult: function (error, doc) {
            if (error) {
                this.sendSearchError(error);
                return;
            }

            if (doc) {
                this.sendPayDate(doc.payDate);
            } else {
                this.sendNotFound();
            }
        },

        /**
         * @private
         * @param {Object} error Объект ошибки.
         */
        sendSearchError: function (error) {
            this.sendHtml(
                '<b>Ошибка!</b><br>' + error.toString()
            );
        },

        /**
         * @private
         * @param {Date/Null} payDate Дата окончания услуг.
         */
        sendPayDate: function (payDate) {
            var defaultDate = Ext.Date.parse('20.05.2016', 'd.m.Y');

            if (payDate === defaultDate) {
                this.sendHtml('<b>Не оплачено и не платилось никогда.</b>');
                return;
            }

            if (payDate < new Date) {
                this.sendHtml('<b>Не оплачено, истекло ' + payDate + '</b>');
            } else {
                this.sendHtml('<b>Оплачено до ' + payDate + '</b>');
            }
        },

        /**
         * @private
         */
        sendNotFound: function () {
            this.sendHtml('<b>Клиент с таким логином не найден</b>');
        },

        /**
         * @private
         * @param {String} html Строка для отправки.
         */
        sendHtml: function (html) {
            this.getExpressResponse().sendHtml(html);
        }
    }
});
/**
 * Логика отправки запроса на бесплатный логотип.
 */
Ext.define('B.biz.client.DrawForMe', {
    extend: 'B.AbstractRequestHandler',

    config: {

        /**
         * @private
         * @cfg {String} id ID компании.
         */
        id: null
    },

    constructor: function () {
        this.callParent(arguments);

        B.util.Function.queue([
            this.getAccountStep,
            this.sendMailStep,
            this.sendSuccess
        ], this);
    },

    privates: {

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        getAccountStep: function (next) {
            Ext.create('B.biz.auth.util.Account', {
                key: this.getRequestModel().get('key'),
                type: 'company',
                scope: this,
                callback: function (acc) {
                    var data = acc.getPrivateAccountData();

                    if (data) {
                        this.setId(data._id);
                        next();
                    } else {
                        this.sendError('Данные указанного аккаунта не найдены!');
                    }
                }
            });
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        sendMailStep: function (next) {
            var id = this.getId();

            Ext.create('B.Mail', {
                callback: next
            }).sendDrawForMeRequest(id);
        }
    }
});
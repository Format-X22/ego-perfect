/**
 * Логика размещения компании клиента.
 */
Ext.define('B.biz.client.Release', {
    extend: 'B.AbstractRequestHandler',

    requires: [
        'B.biz.auth.util.Account'
    ],

    config: {

        /**
         * @private
         * @cfg {Object} accountData Данные аккаунта.
         */
        accountData: null
    },

    constructor: function () {
        this.callParent(arguments);
        
        B.util.Function.queue([
            this.extractAccountStep,
            this.validateAccountStep,
            this.makeTagsStep,
            this.makeSearchObjectStep,
            this.writeSearchObjectStep,
            this.sendSuccess
        ], this);

    },

    privates: {

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        extractAccountStep: function (next) {
            Ext.create('B.biz.auth.util.Account', {
                key: this.getRequestModel().get('key'),
                type: 'company',
                scope: this,
                callback: function (acc) {
                    var data = acc.getPrivateAccountData();

                    if (data) {
                        this.setAccountData(data);
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
        validateAccountStep: function (next) {
            var data = this.getAccountData();
            var basic =   Ext.create('B.biz.client.model.BasicData');
            var summary = Ext.create('B.biz.client.model.Summary');
            var photo =   Ext.create('B.biz.client.model.Photo');
            var words =   Ext.create('B.biz.client.model.Words');

            data.key = true; // Модели требуют наличия ключа сессии.
            
            basic.set(data);
            summary.set(data);
            photo.set(data);
            words.set(data);

            if (!basic.isValid()) {
                this.sendError('Базовые данные о компании ещё не заполнены.');
                return;
            }

            if (!summary.isValid()) {
                this.sendError('Описание компании ещё не заполнено.');
                return;
            }

            if (!photo.isValid()) {
                this.sendError('Фотографии ещё не заполнены.');
                return;
            }

            if (!words.isValid()) {
                this.sendError('Ключевые слова ещё не заполнены.');
                return;
            }

            next();
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        makeTagsStep: function (next) {
            next();
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        makeSearchObjectStep: function (next) {
            next();
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        writeSearchObjectStep: function (next) {
            next();
        }
    }
});
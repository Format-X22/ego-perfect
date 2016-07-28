/**
 * Сервис еженедельных отчетов для компании.
 */
Ext.define('B.service.WeekReport', {
    extend: 'B.service.AbstractService',

    serviceNameForLogger: 'Еженедельные отчеты для компании',

    config: {

        /**
         * @private
         * @cfg {Object[]} data Данные для рассылки.
         */
        data: null
    },

    constructor: function () {
        this.callParent(arguments);

        B.util.Function.queue([
            this.extractDataStep,
            this.sendMailsStep
        ], this);
    },

    /**
     * @protected
     * Оправка письма клиенту.
     * @param {String} login Логин клиента.
     * @param {Object} data Сопутствующие данные.
     */
    sendMailToClient: function (login, data) {
        //
    },

    privates: {

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        extractDataStep: function (next) {
            //
        },

        /**
         * @private
         */
        sendMailsStep: function () {
            //
        }
    }
});
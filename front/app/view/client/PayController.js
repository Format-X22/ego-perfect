/**
 * Контроллер платежей клиента.
 */
Ext.define('A.view.client.PayController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.clientPay',

    /**
     * Оплата на 1 месяц.
     */
    pay1Month: function () {
        alert('Оплата будет доступна после 1 июня (1)');
    },

    /**
     * Оплата на 12 месяцев.
     */
    pay12Month: function () {
        alert('Оплата будет доступна после 1 июня (12)');
    },

    /**
     * Оплата на 1 месяц без карты.
     */
    noCardPay1Month: function () {
        Ext.create('A.view.client.pay.NoCardPayWindow', {
            monthCount: 1,
            companyId: this.getCompanyId()
        });
    },

    /**
     * Оплата на 12 месяцев без карты.
     */
    noCardPay12Month: function () {
        Ext.create('A.view.client.pay.NoCardPayWindow', {
            monthCount: 12,
            companyId: this.getCompanyId()
        });
    },

    privates: {

        /**
         * @private
         * @return {String} ID.
         */
        getCompanyId: function () {
            return this.getView().up('form').getValues()._id;
        }
    }
});
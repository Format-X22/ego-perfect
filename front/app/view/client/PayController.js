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
        // @TODO
    },

    /**
     * Оплата на 12 месяцев.
     */
    pay12Month: function () {
        // @TODO
    },

    /**
     * Оплата на 1 месяц без карты.
     */
    noCardPay1Month: function () {
        this.noCardPay(1);
    },

    /**
     * Оплата на 3 месяца без карты.
     */
    noCardPay3Month: function () {
        this.noCardPay(3, 7160);
    },

    /**
     * Оплата на 6 месяцев без карты.
     */
    noCardPay6Month: function () {
        this.noCardPay(6, 14059);
    },

    /**
     * Оплата на 12 месяцев без карты.
     */
    noCardPay12Month: function () {
        this.noCardPay(12);
    },

    /**
     * Оплата на 18 месяцев без карты.
     */
    noCardPay18Month: function () {
        this.noCardPay(18);
    },

    /**
     * Оплата на 24 месяцев без карты.
     */
    noCardPay24Month: function () {
        this.noCardPay(24);
    },

    privates: {

        /**
         * @private
         * @param {Number} month Количество месяцев.
         * @param {Number} [forceCost] Жесткая установка цены.
         */
        noCardPay: function (month, forceCost) {
            Ext.create('A.view.client.pay.NoCardPayWindow', {
                monthCount: month,
                forceCost: forceCost,
                companyId: this.getCompanyId()
            });
        },

        /**
         * @private
         * @return {String} ID.
         */
        getCompanyId: function () {
            return this.getView().up('form').getValues()._id;
        }
    }
});
/**
 * Контроллер платежей клиента.
 */
Ext.define('A.view.client.PayController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.clientPay',

    config: {

        /**
         * @private
         * @cfg {Number} monthCost Цена за месяц.
         */
        monthCost: 2190,

        /**
         * @private
         * @cfg {String} payButtonTpl Шаблон текста кнопки оплаты.
         */
        payButtonTpl: 'Оплатить на {count} месяцев - {cost} рублей<tpl if="discount"> (скидка {discount}%)</tpl>',

        /**
         * @private
         * @cfg {Number} currentCost Текущее значение для оплаты.
         */
        currentCost: 0
    },

    /**
     * Подготовка кнопки оплаты.
     */
    preparePayButton: function () {
        var slider = this.getView().down('#monthSlider');
        var count = slider.getValue();
        
        this.recalculateCost(slider, count);
    },
    
    /**
     * Пересчитывает цену оплаты.
     * @param {Ext.slider.Single} field Слайдер количества месяцев.
     * @param {Number} count Количество месяцев.
     */
    recalculateCost: function (field, count) {
        var payButton = this.getView().down('#payButton');
        var discount = 0;
        var monthCost = this.getMonthCost();
        var tpl = new Ext.XTemplate(this.getPayButtonTpl());
        var cost;

        switch (count) {
            case 1:
            case 2:
                break;
            case 3:
            case 4:
            case 5:
                discount = 10;
                break;
            case 6:
            case 7:
            case 8:
                discount = 15;
                break;
            case 9:
            case 10:
            case 11:
                discount = 20;
                break;
            case 12:
                discount = 25;
                break;
        }

        cost = Math.round((count * (100 - discount) * monthCost) / 100);
        
        this.setCurrentCost(cost);
        
        payButton.setText(tpl.apply({
            count: count,
            cost: cost,
            discount: discount
        }));
    },

    /**
     * Оплата без карты на выбранное слайдером количество месяцев. 
     */
    noCardPaySlider: function () {
        var count = this.getView().down('#monthSlider').getValue();
        var cost = this.getCurrentCost();
        
        this.noCardPay(count, cost);
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
/**
 * Оплата без карты.
 */
Ext.define('A.view.client.pay.NoCardPayWindow', {
    extend: 'Ext.window.Window',
    xtype: 'clientPayNoCardPayWindow',

    maximizable: true,
    autoShow: true,
    title: 'Реквизиты оплаты',

    config: {

        /**
         * @cfg {Number} monthCount Количество месяцев, на которое происходит оплата.
         */
        monthCount: 0,

        /**
         * @cfg {String} companyId MongoID компании в виде строки.
         */
        companyId: '',

        /**
         * @private
         * @cfg {Number} cost Стоимость одного месяца услуги.
         */
        oneMonthCost: 2190
    },

    items: [
        {
            itemId: 'text',
            xtype: 'component',
            padding: '40 50',
            data: {
                cost: 0
            },
            tpl:
                'Стоимость услуги - <b>{cost} рублей</b><br>' +
                '<br>' +
                'Время действия услуги - <b>{count} месяц{countTail}</b><br>' +
                '<br>' +
                'В течении 24 часов после поступления денег на расчетный счет ' +
                'компания начнет отображаться в общем поиске.<br>' +
                '<br>' +
                '<b>Назначение платежа:</b><br>' +
                '<i>«Оплата услуги размещения компании {companyId}»</i><br>' +
                '<br>' +
                '<b>Реквизиты для платежа:</b><br>' +
                'Hаименование организации: ООО "Простые числа"<br>' +
                'ИНН: 7716823512<br>' +
                'Р/сч: 40702810201270006807<br>' +
                'БИК: 044583999<br>' +
                'Кор/сч: 30101810600000000999 в Ф ОНЛАЙН ПАО "ХАНТЫ-МАНСИЙСКИЙ БАНК ОТКРЫТИЕ"<br>' +
                '<br>' +
                '<b>Контакты:</b><br>' +
                'Телефон: <a class="link" href="tel:+79251546879">+7 (925) 154-68-79</a><br>' +
                'Адрес электронной почты: <a class="link" href="mailto:w@фирмы.онлайн">w@фирмы.онлайн</a><br>'
        }
    ],

    /**
     * @inheritdoc
     */
    initComponent: function () {
        this.callParent(arguments);

        var companyId = this.getCompanyId();
        var cost = this.getOneMonthCost();
        var count = this.getMonthCount();
        var countTail;

        switch (count % 10) {
            case 1:
                countTail = '';
                break;
            case 2:
            case 3:
            case 4:
                countTail = 'a';
                break;
            default:
                countTail = 'ев';
        }

        if (count > 10 && count < 15) {
            countTail = 'ев';
        }
        
        this.down('#text').setData({
            companyId: companyId,
            count: count,
            countTail: countTail,
            cost: cost * count
        });
    }
});
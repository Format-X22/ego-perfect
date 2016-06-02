/**
 * Оплата без карты.
 */
Ext.define('A.view.client.pay.NoCard', {
    extend: 'Ext.form.Panel',
    controller: 'clientPay',
    xtype: 'clientPayNoCard',

    requires: [
        'A.view.client.pay.NoCardPayWindow'
    ],
    
    layout: {
        type: 'vbox',
        align: 'center'
    },

    items: [
        {
            xtype: 'adminTopDescription',
            html:
                'Оплата услуг сервиса перечислением на расчетный счет.<br>' +
                'После оплаты на вашу почту будет выслан акт выполненых работ.'
        },
        {
            name: 'payDate',
            xtype: 'displayfield',
            fieldLabel: 'Сервис оплачен до',
            labelWidth: 145,
            padding: '0 40',
            readOnly: true,
            renderer: function (value) {
                var date = Ext.Date.parse(value, 'c');
                var format = Ext.Date.format(date, 'd.m.Y');

                if (new Date() < date) {
                    return '<b>' + format + '</b>';
                } else {
                    return '<b>не оплачено</b>';
                }
            }
        },
        {
            flex: 1
        },
        {
            xtype: 'container',
            width: '100%',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            defaults: {
                width: 450,
                margin: 20
            },
            items: [
                {
                    xtype: 'image',
                    width: 180,
                    height: 103,
                    margin: '0 0 10 0',
                    src: '/resources/img/logo.svg',
                    plugins: 'responsive',
                    responsiveConfig: {
                        'height > 600': {
                            hidden: false
                        },
                        'height < 600': {
                            hidden: true
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Оплатить на 12 месяцев - 26 280 рублей',
                    handler: 'noCardPay12Month'
                },
                {
                    xtype: 'button',
                    text: 'Оплатить на 18 месяца - 39 420 рублей',
                    handler: 'noCardPay18Month'
                },
                {
                    xtype: 'button',
                    text: 'Оплатить на 24 месяца - 52 560 рублей',
                    handler: 'noCardPay24Month'
                }
            ]
        },
        {
            flex: 5
        }
    ]
});
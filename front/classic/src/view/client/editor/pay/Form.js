/**
 * Внимание!
 * В данный момент отключено в связи с отсутсвием эквайринга!
 * Хранится в готовом виде в ожидании подключения!
 * 
 * Платежная форма.
 */
Ext.define('A.view.client.pay.Form', {
    extend: 'Ext.panel.Panel',
    xtype: 'clientPayForm',

    layout: {
        type: 'vbox'
    },

    items: [
        {
            xtype: 'adminTopDescription',
            html:
                'Оплата услуг сервиса.<br>' +
                'Поддерживаются любые карты Visa и MasterCard.<br>' +
                'Уровень безопасности используемого платежного сервиса подтвержден сертификатом PCI DSS.<br><br>' +
                'При необходимости будет предоставлен акт выполненых работ.<br>' +
                'Для получения акта напишите письмо на адрес w@фирмы.онлайн'
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

                return '<b>' + format + '</b>';
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
                    text: 'Оплатить на 1 месяц - 2 190 рублей',
                    handler: 'pay1Month'
                },
                {
                    xtype: 'button',
                    text: 'Оплатить на 12 месяцев - 26 280 рублей',
                    handler: 'pay12Month'
                },
                {
                    xtype: 'component',
                    html:
                        '<div style="' +
                            'width: 450px;' +
                            'text-align: center;' +
                            'font-style: italic;' +
                        '">' +
                            'При оплате на 12 месяцев +2 месяца бесплатно.' +
                        '</div>'
                }
            ]
        },
        {
            flex: 5
        }
    ]
});
/**
 * Общая сводка по партнеру.
 */
Ext.define('A.view.partner.statistic.Total', {
    extend: 'Ext.container.Container',
    xtype: 'partnerStatisticTotal',

    layout: 'vbox',
    height: '100%',

    items: [
        {
            xtype: 'adminTopDescription',
            html:
                'Срез текущего состояния дел.<br>' +
                'Показывает сумму доходов и количество привлеченных клиентов и партнеров<br>' +
                'с начала месяца.'
        },
        {
            itemId: 'placeholder',
            xtype: 'partnerStatisticEmptyPlaceholder'
        },
        {
            xtype: 'container',
            layout: 'fit',
            width: '100%',
            flex: 1,
            items: [
                {
                    itemId: 'chart',
                    xtype: 'polar',
                    flex: 1,
                    height: '100%',
                    store: {
                        model: 'A.model.PartnerTotalStats',
                        data: [
                            {
                                name: 'Клиенты',
                                count: 25,
                                money: 220726
                            },
                            {
                                name: 'Партнеры',
                                count: 5,
                                money: 240502
                            }
                        ]
                    },
                    theme: 'sky',
                    interactions: [
                        'rotate'
                    ],
                    legend: {
                        toggleable: false
                    },
                    series: [
                        {
                            type: 'pie',
                            angleField: 'money',
                            label: {
                                field: 'name',
                                font: '16px Helvetica',
                                renderer: function (text, sprite, config, rendererData, index) {
                                    var record = rendererData.store.getAt(index);

                                    return [
                                        record.get('name'),
                                        record.get('count'),
                                        record.get('money') + 'р'
                                    ].join('\n\n');
                                }
                            },
                            donut: 30,
                            subStyle: {
                                fill: [
                                    '#6AE0FB',
                                    '#009FE8'
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
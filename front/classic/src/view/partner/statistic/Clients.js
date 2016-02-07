/**
 * График клиентов, привлеченных партнером.
 */
Ext.define('A.view.partner.statistic.Clients', {
    extend: 'Ext.container.Container',
    xtype: 'partnerStatisticClients',

    layout: 'vbox',
    height: '100%',

    items: [
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
                    xtype: 'cartesian',
                    store: {
                        model: 'A.model.Stats',
                        data: [
                            {
                                date: 'янв',
                                value: 0
                            },
                            {
                                date: 'фев',
                                value: 2
                            },
                            {
                                date: 'мар',
                                value: 8
                            },
                            {
                                date: 'апр',
                                value: 16
                            },
                            {
                                date: 'май',
                                value: 20
                            },
                            {
                                date: 'июн',
                                value: 21
                            },
                            {
                                date: 'июл',
                                value: 20
                            },
                            {
                                date: 'авг',
                                value: 25
                            },
                            {
                                date: 'сен',
                                value: 37
                            },
                            {
                                date: 'окт',
                                value: 38
                            },
                            {
                                date: 'ноя',
                                value: 40
                            },
                            {
                                date: 'дек',
                                value: 45
                            }
                        ]
                    },
                    theme: 'sky',
                    axes: [
                        {
                            type: 'numeric',
                            position: 'left',
                            title: 'Количество зарегистрированных с ключем',
                            grid: true,
                            minimum: 0,
                            fields: [
                                'value'
                            ]
                        },
                        {
                            type: 'category',
                            position: 'bottom',
                            title: 'Месяц',
                            fields: [
                                'date'
                            ]
                        }
                    ],
                    series: {
                        type: 'area',
                        xField: 'date',
                        yField: 'value',
                        marker: {
                            opacity: 0,
                            scaling: 0.01,
                            fx: {
                                duration: 200,
                                easing: 'easeOut'
                            }
                        },
                        highlightCfg: {
                            opacity: 1,
                            scaling: 1.5
                        },
                        subStyle: {
                            fill: '#6AE0FB'
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: function (tooltip, record) {
                                tooltip.setHtml(record.get('value') + 'шт');
                            }
                        }
                    }
                }
            ]
        }
    ]
});
/**
 * График доходности партнера.
 */
Ext.define('A.view.partner.statistic.Income', {
    extend: 'Ext.container.Container',
    xtype: 'partnerStatisticIncome',

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
                                value: 44700
                            },
                            {
                                date: 'мар',
                                value: 59982
                            },
                            {
                                date: 'апр',
                                value: 68800
                            },
                            {
                                date: 'май',
                                value: 90020
                            },
                            {
                                date: 'июн',
                                value: 158045
                            },
                            {
                                date: 'июл',
                                value: 194900
                            },
                            {
                                date: 'авг',
                                value: 258030
                            },
                            {
                                date: 'сен',
                                value: 288455
                            },
                            {
                                date: 'окт',
                                value: 364869
                            },
                            {
                                date: 'ноя',
                                value: 375768
                            },
                            {
                                date: 'дек',
                                value: 392700
                            }
                        ]
                    },
                    theme: 'sky',
                    axes: [
                        {
                            type: 'numeric',
                            position: 'left',
                            title: 'Рубли',
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
                            fill: '#47A3F5'
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: function (tooltip, record) {
                                tooltip.setHtml(record.get('value') + 'р');
                            }
                        }
                    }
                }
            ]
        }
    ]
});
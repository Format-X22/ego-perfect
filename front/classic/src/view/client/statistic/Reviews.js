/**
 * Статистика отзывов клиента.
 */
Ext.define('A.view.client.statistic.Reviews', {
    extend: 'Ext.container.Container',
    xtype: 'clientStatisticReviews',

    layout: 'vbox',
    height: '100%',

    items: [
        {
            itemId: 'placeholder',
            xtype: 'clientStatisticEmptyPlaceholder'
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
                                value: 4
                            },
                            {
                                date: 'апр',
                                value: 4
                            },
                            {
                                date: 'май',
                                value: 5
                            },
                            {
                                date: 'июн',
                                value: 6
                            },
                            {
                                date: 'июл',
                                value: 10
                            },
                            {
                                date: 'авг',
                                value: 11
                            },
                            {
                                date: 'сен',
                                value: 12
                            },
                            {
                                date: 'окт',
                                value: 14
                            },
                            {
                                date: 'ноя',
                                value: 18
                            },
                            {
                                date: 'дек',
                                value: 18
                            }
                        ]
                    },
                    theme: 'sky',
                    axes: [
                        {
                            type: 'numeric',
                            position: 'left',
                            title: 'Количество',
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
                            fill: '#1BC3CB'
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: function (tooltip, record) {
                                tooltip.setHtml(record.get('value'));
                            }
                        }
                    }
                }
            ]
        }
    ]
});
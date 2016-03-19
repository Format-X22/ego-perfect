/**
 * Статистика количества звезд в отзывах у клиента.
 */
Ext.define('A.view.client.statistic.Stars', {
    extend: 'Ext.container.Container',
    xtype: 'clientStatisticStars',

    layout: 'vbox',
    height: '100%',

    items: [
        {
			xtype: 'adminTopDescription',
            html:
                'Звездность отзывов указывает на отношение ваших клиентов к вашим услугам.<br>' +
                'Однако не стоит забывать о том что отзывы обычно оставляют только те клиенты,<br>' +
                'которым что-то не понравилось, это классический паттерн поведения большей части людей.<br>' +
                'Просите клиентов оставлять отзывы, особенно если им всё понравилось, это улучшит отношение к вам<br>' +
				'ваших новых клинетов.'
        },
        {
            itemId: 'placeholder',
            xtype: 'clientStatisticEmptyPlaceholder'
        },
        {
            xtype: 'container',
            layout: 'fit',
            width: '100%',
			margin: '10 0 0 0',
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
                                value: 4
                            },
                            {
                                date: 'мар',
                                value: 4.2
                            },
                            {
                                date: 'апр',
                                value: 4.4
                            },
                            {
                                date: 'май',
                                value: 4.1
                            },
                            {
                                date: 'июн',
                                value: 3.9
                            },
                            {
                                date: 'июл',
                                value: 4.0
                            },
                            {
                                date: 'авг',
                                value: 4.2
                            },
                            {
                                date: 'сен',
                                value: 4.3
                            },
                            {
                                date: 'окт',
                                value: 4.4
                            },
                            {
                                date: 'ноя',
                                value: 4.8
                            },
                            {
                                date: 'дек',
                                value: 4.9
                            }
                        ]
                    },
                    theme: 'sky',
                    axes: [
                        {
                            type: 'numeric',
                            position: 'left',
                            title: 'Среднее значение',
                            grid: true,
                            minimum: 0,
                            maximum: 5,
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
                            fill: '#33AFEA'
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
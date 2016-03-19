/**
 * Статистика просмотров страницы клиента.
 */
Ext.define('A.view.client.statistic.Views', {
    extend: 'Ext.container.Container',
    xtype: 'clientStatisticViews',

    layout: 'vbox',
    height: '100%',

    items: [
        {
			xtype: 'adminTopDescription',
            html:
                'Количество просмотров отображает интерес к вашей компании.<br>' +
                'Просмотры также влияют и на ваш рейтинг.<br>' +
                'Каждый просмотр - потенциальный клиент.<br>' +
                'Чем лучше вы представете свою компанию, чем более интереснее будут ваши предложения и фото,<br>' +
                'тем больше потенциальных клиентов станут вашими реальными клиентами.'
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
                                value: 122
                            },
                            {
                                date: 'мар',
                                value: 176
                            },
                            {
                                date: 'апр',
                                value: 240
                            },
                            {
                                date: 'май',
                                value: 280
                            },
                            {
                                date: 'июн',
                                value: 352
                            },
                            {
                                date: 'июл',
                                value: 500
                            },
                            {
                                date: 'авг',
                                value: 586
                            },
                            {
                                date: 'сен',
                                value: 602
                            },
                            {
                                date: 'окт',
                                value: 681
                            },
                            {
                                date: 'ноя',
                                value: 712
                            },
                            {
                                date: 'дек',
                                value: 799
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
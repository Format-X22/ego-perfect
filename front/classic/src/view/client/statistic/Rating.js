/**
 * Статистика рейтинга клиента.
 */
Ext.define('A.view.client.statistic.Rating', {
    extend: 'Ext.container.Container',
    xtype: 'clientStatisticRating',

    layout: 'fit',

    items: [
        {
            itemId: 'placeholder',
            xtype: 'clientStatisticEmptyPlaceholder'
        },
        {
            itemId: 'chart',
            xtype: 'cartesian',
            hidden: true,
            store: {
                model: 'A.model.Stats',
                data: [
                    {
                        date: 'янв',
                        value: 0
                    },
                    {
                        date: 'фев',
                        value: 7
                    },
                    {
                        date: 'мар',
                        value: 26
                    },
                    {
                        date: 'апр',
                        value: 36
                    },
                    {
                        date: 'май',
                        value: 82
                    },
                    {
                        date: 'июн',
                        value: 92
                    },
                    {
                        date: 'июл',
                        value: 126
                    },
                    {
                        date: 'авг',
                        value: 145
                    },
                    {
                        date: 'сен',
                        value: 155
                    },
                    {
                        date: 'окт',
                        value: 210
                    },
                    {
                        date: 'ноя',
                        value: 378
                    },
                    {
                        date: 'дек',
                        value: 450
                    }
                ]
            },
            theme: 'sky',
            axes: [
                {
                    type: 'numeric',
                    position: 'left',
                    title: 'Пункты',
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
                        tooltip.setHtml(record.get('value'));
                    }
                }
            }
        }
    ]
});
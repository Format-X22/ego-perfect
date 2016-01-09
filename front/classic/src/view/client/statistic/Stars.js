/**
 * Статистика количества звезд в отзывах у клиента.
 */
Ext.define('A.view.client.statistic.Stars', {
    extend: 'Ext.container.Container',
    xtype: 'clientStatisticStars',

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
                        value: 5
                    },
                    {
                        date: 'фев',
                        value: 5
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
                        value: 4.6
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
                        value: 4.7
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
});
/**
 * График доходности партнера.
 */
Ext.define('A.view.partner.statistic.Income', {
    extend: 'Ext.container.Container',
    xtype: 'partnerStatisticIncome',

    layout: 'fit',

    items: [
        {
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
                        value: 700
                    },
                    {
                        date: 'мар',
                        value: 982
                    },
                    {
                        date: 'апр',
                        value: 1400
                    },
                    {
                        date: 'май',
                        value: 8020
                    },
                    {
                        date: 'июн',
                        value: 12045
                    },
                    {
                        date: 'июл',
                        value: 14900
                    },
                    {
                        date: 'авг',
                        value: 16000
                    },
                    {
                        date: 'сен',
                        value: 18456
                    },
                    {
                        date: 'окт',
                        value: 24869
                    },
                    {
                        date: 'ноя',
                        value: 25768
                    },
                    {
                        date: 'дек',
                        value: 32700
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
});
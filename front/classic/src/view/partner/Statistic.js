/**
 * Статистика для партнера.
 */
Ext.define('A.view.partner.Statistic', {
    extend: 'Ext.tab.Panel',
    xtype: 'partnerStatistic',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.PolarChart',
        'Ext.chart.theme.Sky'
    ],

    defaults: {
        xtype: 'container',
        layout: 'fit',
        padding: 30
    },

    items: [
        {
            title: 'Сводка',
            items: [
                {
                    xtype: 'polar',
                    store: {
                        model: 'A.model.PartnerTotalStats',
                        data: [
                            {
                                name: 'Клиенты',
                                value: 25
                            },
                            {
                                name: 'Партнеры',
                                value: 5
                            }
                        ]
                    },
                    theme: 'sky',
                    interactions: [
                        {
                            type: 'rotate'
                        }
                    ],
                    series: [
                        {
                            type: 'pie',
                            angleField: 'value',
                            label: {
                                field: 'name',
                                font: '16px Helvetica',
                                renderer: function (text, sprite, config, rendererData, index) {
                                    var record = rendererData.store.getAt(index);
                                    var name = record.get('name');
                                    var value = record.get('value');

                                    return name + '\n\n' + value;
                                }
                            },
                            donut: 30
                        }
                    ],
                    legend: {
                        toggleable: false
                    }
                }
            ]
        },
        {
            title: 'Регистрации клиентов',
            items: [
                {
                    xtype: 'cartesian',
                    /*axes: [
                        {
                            type: 'numeric',
                            position: 'left',
                            title: 'Количество регистраций с ключем',
                            minimum: 0
                        },
                        {
                            type: 'time',
                            position: 'bottom',
                            title: 'Месяц'
                        }
                    ],*/
                    store: {
                        fields: ['name', 'data1', 'data2', 'data3'],
                        data: [{
                            name: 'metric one',
                            data1: 10,
                            data2: 12,
                            data3: 14
                        }, {
                            name: 'metric two',
                            data1: 7,
                            data2: 8,
                            data3: 16
                        }, {
                            name: 'metric three',
                            data1: 60,
                            data2: 2,
                            data3: 14
                        }, {
                            name: 'metric four',
                            data1: 2,
                            data2: 14,
                            data3: 6
                        }, {
                            name: 'metric five',
                            data1: 27,
                            data2: 38,
                            data3: 36
                        }]
                    },
                    axes: [{
                        type: 'numeric',
                        position: 'left',
                        fields: ['data1'],
                        grid: true,
                        minimum: 0
                    }, {
                        type: 'category',
                        position: 'bottom',
                        fields: ['name']
                    }],
                    series: {
                        type: 'area',
                        subStyle: {
                            fill: ['#0A3F50', '#30BDA7', '#96D4C6']
                        },
                        xField: 'name',
                        yField: ['data1', 'data2', 'data3']
                    }
                }
            ]
        },
        {
            title: 'Регистрации партнеров'
        },
        {
            title: 'Доходность'
        }
    ]
});
/**
 * Общая сводка по партнеру.
 */
Ext.define('A.view.partner.statistic.Total', {
    extend: 'Ext.container.Container',
    xtype: 'partnerStatisticTotal',

    layout: 'fit',

    items: [
        {
            itemId: 'placeholder',
            xtype: 'partnerStatisticEmptyPlaceholder'
        },
        {
            itemId: 'chart',
            xtype: 'polar',
            hidden: true,
            flex: 1,
            height: '100%',
            store: {
                model: 'A.model.PartnerTotalStats',
                data: [
                    {
                        name: 'Клиенты',
                        count: 25,
                        money: 12726
                    },
                    {
                        name: 'Партнеры',
                        count: 5,
                        money: 14502
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
                                record.get('count') + 'шт',
                                record.get('money') + 'р'
                            ].join('\n\n');
                        }
                    },
                    donut: 30
                }
            ]
        }
    ]
});
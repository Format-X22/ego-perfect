/**
 * Статистика для партнера.
 */
Ext.define('A.view.partner.statistic.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'partnerStatistic',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.PolarChart',
        'Ext.chart.theme.Sky',
        'A.view.partner.statistic.Total',
        'A.view.partner.statistic.Clients',
        'A.view.partner.statistic.Partners',
        'A.view.partner.statistic.Income'
    ],

    defaults: {
        padding: 30
    },

    items: [
        {
            title: 'Сводка',
            xtype: 'partnerStatisticTotal'

        },
        {
            title: 'Регистрации клиентов',
            xtype: 'partnerStatisticClients'
        },
        {
            title: 'Регистрации партнеров',
            xtype: 'partnerStatisticPartners'
        },
        {
            title: 'Доходность',
            xtype: 'partnerStatisticIncome'
        }
    ]
});
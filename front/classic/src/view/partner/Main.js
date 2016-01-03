/**
 * Главный виджет части приложения для партнеров для ПК.
 */
Ext.define('A.view.partner.Main', {
    extend: 'Ext.container.Container',
    xtype: 'appMainPartner',

    requires: [
        'A.view.partner.TopToolbar',
        'A.view.partner.Statistic',
        'A.view.partner.Profile',
        'A.view.partner.Key'
    ],

    layout: 'vbox',
    defaults: {
        width: '100%'
    },

    items: [
        {
            xtype: 'partnerTopToolbar'
        },
        {
            xtype: 'tabpanel',
            flex: 1,
            items: [
                {
                    xtype: 'partnerStatistic',
                    title: 'Статистика',
                    iconCls: 'x-fa fa-line-chart'
                },
                {
                    xtype: 'partnerProfile',
                    title: 'Профиль',
                    iconCls: 'x-fa fa-user'
                },
                {
                    xtype: 'partnerKey',
                    title: 'Персональный ключ партнера',
                    iconCls: 'x-fa fa-key'
                }
            ]
        }
    ]
});
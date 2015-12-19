/**
 * Главный виджет публичной части приложения для ПК.
 */
Ext.define('A.view.main.Main', {
    extend: 'Ext.container.Container',
    xtype: 'appMainPublic',

    requires: [
        'A.view.main.search.SearchContainer',
        'A.view.main.infoPage.ForClients',
        'A.view.main.infoPage.ForPartners'
    ],

    layout: 'fit',

    items: [
        {
            itemId: 'mainTabPanel',
            xtype: 'tabpanel',
            tabBarPosition: 'top',
            items: [
                {
                    itemId: 'search',
                    xtype: 'searchContainer',
                    title: 'Поиск',
                    iconCls: 'x-fa fa-search'
                },
                {
                    itemId: 'clients',
                    xtype: 'pageForClients',
                    title: 'Клиентам',
                    iconCls: 'x-fa fa-user'
                },
                {
                    itemId: 'partners',
                    xtype: 'pageForPartners',
                    title: 'Партнерам',
                    iconCls: 'x-fa fa-money'
                }
            ]
        }
    ]
});

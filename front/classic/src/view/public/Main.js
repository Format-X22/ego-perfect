/**
 * Главный виджет приложения для ПК.
 */
Ext.define('A.view.public.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'app-main',

    requires: [
        'A.view.public.search.SearchContainer',
        'A.view.public.infoPage.ForClients',
        'A.view.public.infoPage.ForPartners'
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

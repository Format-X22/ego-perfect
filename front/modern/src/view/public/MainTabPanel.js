/**
 * Главная панель вкладок, содержащая все страницы приложения.
 */
Ext.define('A.view.public.MainTabPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'mainTabPanel',
    controller: 'mainTabPanel',

    requires: [
        'A.view.public.MainTabPanelController',
        'A.view.public.search.SearchContainer'
    ],

    layout: {
        type: 'card',
        animation: 'flip'
    },
    flex: 1,
    tabBarPosition: 'top',

    defaults: {
        tab: {
            iconAlign: 'top',
            minWidth: 80
        },
        styleHtmlContent: true
    },

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
});
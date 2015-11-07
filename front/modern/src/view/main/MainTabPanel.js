Ext.define('A.view.main.MainTabPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'mainTabPanel',
    controller: 'mainTabPanel',

    requires: [
        'A.view.main.MainTabPanelController',
        'A.view.main.search.SearchContainer'
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
            title: 'Поиск',
            iconCls: 'x-fa fa-search',
            xtype: 'searchContainer'
        },
        {
            title: 'Клиентам',
            iconCls: 'x-fa fa-user',
            xtype: 'pageForClients'
        },
        {
            title: 'Партнерам',
            iconCls: 'x-fa fa-money',
            xtype: 'pageForPartners'
        }
    ]
});
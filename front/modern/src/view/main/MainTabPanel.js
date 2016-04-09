/**
 * Главная панель вкладок, содержащая все страницы приложения.
 */
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
        },
        {
            itemId: 'contacts',
            xtype: 'pageForContacts',
            title: 'Контакты',
            iconCls: 'x-fa fa-phone'
        }
    ]
});
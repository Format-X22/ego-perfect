Ext.define('A.view.main.MainTabPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'mainTabPanel',
    controller: 'mainTabPanel',

    requires: [
        'A.view.main.MainTabPanelController',
        'A.view.main.search.SearchContainer',
        'A.view.main.auth.Login',
        'A.view.main.auth.Register'
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
            iconCls: 'x-fa fa-user'
        },
        {
            title: 'Партнерам',
            iconCls: 'x-fa fa-money'
        },
        {
            title: 'О нас',
            iconCls: 'x-fa fa-thumbs-up'
        },
        {
            title: 'Вход',
            iconCls: 'x-fa fa-home',
            xtype: 'login'
        },
        {
            title: 'Добавить себя',
            iconCls: 'x-fa fa-user-plus',
            xtype: 'register'
        }
    ]
});
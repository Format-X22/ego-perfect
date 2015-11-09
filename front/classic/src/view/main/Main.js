Ext.define('A.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'app-main',

    requires: [
        'A.view.main.search.SearchContainer',
        'A.view.main.infoPage.ForClients',
        'A.view.main.infoPage.ForPartners'
    ],

    layout: 'fit',

    items: [
        {
            xtype: 'tabpanel',
            tabBarPosition: 'top',
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
        }
    ]
});

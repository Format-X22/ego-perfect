Ext.define('A.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            text: 'Меню',
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    headerPosition: 'left',

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            iconAlign: 'left',
            textAlign: 'left'
        }
    },

    items: [
        {
            title: 'Поиск',
            iconCls: 'fa-search'
        },
        {
            title: 'Клиентам',
            iconCls: 'fa-user'
        },
        {
            title: 'Партнерам',
            iconCls: 'fa-user'
        },
        {
            title: 'О нас',
            iconCls: 'fa-user'
        },
        {
            title: 'Вход',
            iconCls: 'fa-home'
        },
        {
            title: 'Хочу к вам',
            iconCls: 'fa-user-plus'
        }
    ]
});

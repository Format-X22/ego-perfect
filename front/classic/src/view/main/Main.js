/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('A.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'A.view.main.MainController',
        'A.view.main.MainModel'
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

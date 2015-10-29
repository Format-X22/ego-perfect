Ext.define('A.view.main.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',

    requires: [
        'A.view.main.MainController',
        'A.view.main.MainModel',
        'A.view.main.MobileMenu',
        'A.view.main.Search'
    ],

    controller: 'main',
    viewModel: 'main',
    layout: 'vbox',

    items: [
        {
            xtype: 'toolbar',
            plugins: 'responsive',
            responsiveConfig: {
                'width < 600': {
                    hidden: false
                },
                'width >= 600': {
                    hidden: true
                }
            },
            title: 'Поиск',
            items: [
                '->',
                {
                    iconCls: 'x-fa fa-th-list',
                    iconAlign: 'right',
                    handler: 'showMobileMenu'
                }
            ]
        },
        {
            xtype: 'tabpanel',
            flex: 1,
            tabBarPosition: 'bottom',
            plugins: 'responsive',
            responsiveConfig: {
                'width < 600': {
                    tabBar: {
                        hidden: true
                    },
                    layout: {
                        type: 'card',
                        animation: 'flip'
                    }
                },
                'width >= 600': {
                    tabBar: {
                        hidden: false
                    },
                    layout: {
                        type: 'card',
                        animation: 'flip'
                    }
                }
            },

            defaults: {
                tab: {
                    iconAlign: 'top'
                },
                styleHtmlContent: true
            },

            items: [
                {
                    title: 'Поиск',
                    iconCls: 'x-fa fa-search',
                    items: [
                        {
                            xtype: 'companySearch'
                        }
                    ]
                },
                {
                    title: 'Клиентам',
                    iconCls: 'x-fa fa-user'
                },
                {
                    title: 'Партнерам',
                    iconCls: 'x-fa fa-user'
                },
                {
                    title: 'О нас',
                    iconCls: 'x-fa fa-user'
                },
                {
                    title: 'Вход',
                    iconCls: 'x-fa fa-home',
                    items: [
                        {
                            xtype: 'login'
                        }
                    ]
                },
                {
                    title: 'Хочу к вам',
                    iconCls: 'x-fa fa-user-plus',
                    items: [
                        {
                            xtype: 'register'
                        }
                    ]
                }
            ]
        }
    ],

    initialize: function () {
        var mobileMenu = Ext.create('A.view.main.MobileMenu');
        var menuConfig = {
            side: 'right',
            reveal: true
        };

        Ext.Viewport.setMenu(mobileMenu, menuConfig);

    }
});

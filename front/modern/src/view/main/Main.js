Ext.define('A.view.main.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',

    requires: [
        'A.view.main.MainController',
        'A.view.main.MainModel',
        'A.view.main.MobileMenu'
    ],

    controller: 'main',
    viewModel: 'main',
    layout: 'vbox',

    items: [
        {
            xtype: 'toolbar',
            hidden: true,
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
            tabBar: {
                hidden: true
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
                    iconCls: 'x-fa fa-search'
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
                    iconCls: 'x-fa fa-home'
                },
                {
                    title: 'Хочу к вам',
                    iconCls: 'x-fa fa-user-plus'
                }
            ]
        }
    ],

    initialize: function () {
        var isMobile = Ext.Viewport.getWindowWidth() < 600;

        if (isMobile) {
            this.transformToMobileStyle();
        } else {
            this.transformToTabletStyle();
        }
    },

    privates: {
        transformToMobileStyle: function () {
            var mobileMenu = Ext.create('A.view.main.MobileMenu');
            var menuConfig = {
                side: 'right',
                reveal: true
            };

            Ext.Viewport.setMenu(mobileMenu, menuConfig);

            this.down('toolbar').show();
        },

        transformToTabletStyle: function () {
            this.down('tabpanel').getTabBar().show();
        }
    }
});

/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('A.view.main.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',

    requires: [
        'A.view.main.MainController',
        'A.view.main.MainModel'
    ],

    controller: 'main',
    viewModel: 'main',
    layout: 'vbox',

    items: [
        {
            xtype: 'toolbar',
            hidden: true,
            items: [
                {
                    xtype: 'component',
                    html: 'Поиск'
                },
                '->',
                {
                    text: 'Меню',
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
        if (Ext.Viewport.getWindowWidth() < 600) {
            this.down('toolbar').show();
            Ext.Viewport.setMenu({
                xtype: 'menu',
                scroll: true,
                items: [
                    {
                        text: 'Поиск',
                        iconCls: 'x-fa fa-search'
                    },
                    {
                        text: 'Клиентам',
                        iconCls: 'x-fa fa-user'
                    },
                    {
                        text: 'Партнерам',
                        iconCls: 'x-fa fa-user'
                    },
                    {
                        text: 'О нас',
                        iconCls: 'x-fa fa-user'
                    },
                    {
                        text: 'Вход',
                        iconCls: 'x-fa fa-home'
                    },
                    {
                        text: 'Хочу к вам',
                        iconCls: 'x-fa fa-user-plus'
                    }
                ]
            }, {
                side: 'right',
                reveal: true
            });
        } else {
            this.down('tabpanel').getTabBar().show();
        }
    }
});

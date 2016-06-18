/**
 * Главный виджет публичной части приложения для ПК.
 */
Ext.define('A.view.main.Main', {
    extend: 'Ext.container.Container',
    xtype: 'appMainPublic',
    controller: 'appMainPublic',

    requires: [
        'A.view.main.search.SearchContainer',
        'A.view.main.infoPage.ForClientsWithOffer',
        'A.view.main.infoPage.ForPartnersWithContract',
        'A.view.main.infoPage.ForContacts',
        'A.view.main.auth.LoginPage',
        'A.view.main.auth.RegisterPage'
    ],

    layout: 'fit',

    items: [
        {
            itemId: 'mainTabPanel',
            xtype: 'tabpanel',
            tabBarPosition: 'top',
            tabBar: {
                items: [
                    {
                        xtype: 'tbspacer',
                        flex: 1
                    },
                    {
                        xtype: 'tbtext',
                        padding: '6 25',
                        style: {
                            color: 'white'
                        },
                        html:
                            '<span>' +
                                'КРУГЛОСУТОЧНО БЕСПЛАТНО ' +
                                '<a class="link link-white" href="tel:88002500186">8 (800) 25-00-186</a>' +
                            '</span>'
                    }
                ]
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
                    xtype: 'pageForClientsWithOffer',
                    title: 'Клиентам',
                    iconCls: 'x-fa fa-user'
                },
                {
                    itemId: 'contacts',
                    xtype: 'pageForContacts',
                    title: 'Контакты',
                    iconCls: 'x-fa fa-phone'
                },
                {
                    itemId: 'login',
                    xtype: 'loginPage',
                    title: 'Вход',
                    iconCls: 'x-fa fa-key'
                },
                {
                    itemId: 'register',
                    xtype: 'registerPage',
                    title: 'Регистрация',
                    iconCls: 'x-fa fa-user-plus'
                }
            ],
            listeners: {
                tabchange: 'updatePageHash'
            }
        }
    ]
});

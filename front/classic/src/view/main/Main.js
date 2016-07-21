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
                                '<a class="link link-white" href="tel:88002500186">8 (800) 25-00-186</a>' +
                                ' | круглосуточно' +
                            '</span>'
                    }
                ]
            },
            items: [
                {
                    itemId: 'search',
                    xtype: 'searchContainer',
                    title: 'Поиск'
                },
                {
                    itemId: 'clients',
                    xtype: 'pageForClientsWithOffer',
                    title: 'Клиентам'
                },
                {
                    itemId: 'contacts',
                    xtype: 'pageForContacts',
                    title: 'Контакты'
                },
                {
                    itemId: 'login',
                    xtype: 'loginPage',
                    title: 'Вход'
                },
                {
                    itemId: 'register',
                    xtype: 'registerPage',
                    title: 'Регистрация'
                }
            ],
            listeners: {
                tabchange: 'updatePageHash'
            }
        }
    ]
});

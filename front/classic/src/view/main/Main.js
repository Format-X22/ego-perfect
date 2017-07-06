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
        'A.view.main.infoPage.ClientsOffer',
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
            items: [
                {
                    itemId: 'search',
                    xtype: 'searchContainer',
                    title: 'Explorer',
                    iconCls: 'x-fa fa-search'
                },
                {
                    itemId: 'clients',
                    xtype: 'pageForClients',
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
                    itemId: 'offer',
                    xtype: 'clientsOffer',
                    title: 'Оферта',
                    iconCls: 'x-fa fa-bank'
                },
                {
                    itemId: 'login',
                    xtype: 'loginPage',
                    title: 'Log In',
                    iconCls: 'x-fa fa-key'
                },
                {
                    itemId: 'register',
                    xtype: 'registerPage',
                    title: 'Sign Up',
                    iconCls: 'x-fa fa-user-plus'
                }
            ],
            listeners: {
                tabchange: 'updatePageHash'
            }
        }
    ]
});

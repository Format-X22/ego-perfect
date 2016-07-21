/**
 * Страница с информацией для клиентов и офертой.
 */
Ext.define('A.view.main.infoPage.ForClientsWithOffer', {
    extend: 'Ext.tab.Panel',
    xtype: 'pageForClientsWithOffer',
    controller: 'infoPageMultiTab',
    
    require: [
        'A.view.main.infoPage.ForClients',
        'A.view.main.infoPage.ClientsOffer',
        'A.view.main.infoPage.MultiTabController'
    ],

    listeners: {
        tabchange: 'updateTabLink'
    },
    
    items: [
        {
            itemId: 'show',
            xtype: 'pageForClients',
            title: 'Презентация'
        },
        {
            itemId: 'offer',
            xtype: 'clientsOffer',
            title: 'Оферта'
        }
    ]
});
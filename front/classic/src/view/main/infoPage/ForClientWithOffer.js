/**
 * Страница с информацией для клиентов с офертой.
 */
Ext.define('A.view.main.infoPage.ForClientsWithOffer', {
    extend: 'Ext.tab.Panel',
    xtype: 'pageForClientsWithOffer',
    
    require: [
        'A.view.main.infoPage.ForClients',
        'A.view.main.infoPage.ClientsOffer'
    ],
    
    items: [
        {
            xtype: 'pageForClients',
            title: 'Презентация',
            iconCls: 'x-fa fa-eye'
        },
        {
            xtype: 'clientsOffer',
            title: 'Оферта',
            iconCls: 'x-fa fa-bank'
        }
    ]
});
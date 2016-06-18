/**
 * Виджет с текстом оферты для клиента.
 */
Ext.define('A.view.main.infoPage.ClientsOffer', {
    extend: 'Ext.panel.Panel',
    xtype: 'clientsOffer',

    requires: [
        'A.view.main.infoPage.ClientsOfferText'
    ],

    cls: 'clients-offer',
    scrollable: 'vertical',
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    
    items: [
        {
            xtype: 'clientsOfferText',
            padding: 30,
            maxWidth: 800
        }
    ]
});
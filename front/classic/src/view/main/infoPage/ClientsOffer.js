/**
 * Виджет с текстом оферты для клиента.
 */
Ext.define('A.view.main.infoPage.ClientsOffer', {
    extend: 'Ext.panel.Panel',
    xtype: 'clientsOffer',

    requires: [
        'A.view.main.infoPage.ClientsOfferText'
    ],

    cls: 'clients-offer grey-back',
    scrollable: 'vertical',
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    dockedItems: [
        {
            xtype: 'toolbar',
            height: 0,
            padding: 0,
            cls: 'shadow-toolbar',
            dock: 'top'
        }
    ],
    
    items: [
        {
            xtype: 'clientsOfferText',
            width: '70%',
            padding: 30,
            maxWidth: 800
        }
    ]
});
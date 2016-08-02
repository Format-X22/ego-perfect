/**
 * Окно с клиентской офертой.
 */
Ext.define('A.view.main.auth.ClientOfferRegisterWindow', {
    extend: 'Ext.window.Window',
    controller: 'mainAuthClientOfferRegisterWindow',
    
    requires: [
        'A.view.main.auth.ClientOfferRegisterWindowController',
        'A.view.main.infoPage.ClientsOffer'
    ],

    width: '80%',
    height: '80%',
    maximizable: true,
    autoShow: true,
    title: 'Согласие с Офертой',
    layout: 'fit',

    items: [
        {
            xtype: 'clientsOffer'
        }
    ],

    fbar: [
        {
            xtype: 'tbspacer'
        },
        {
            itemId: 'accept',
            xtype: 'checkbox',
            cls: 'offer-accept-text',
            boxLabel: 'Я полностью соглашаюсь с условиями Оферты',
            listeners: {
                change: 'toggleDoneButton'
            }
        },
        '->',
        {
            itemId: 'next',
            xtype: 'button',
            disabled: true,
            text: 'Завершить регистрацию',
            listeners: {
                click: 'notifyDone'
            }
        }
    ]
});
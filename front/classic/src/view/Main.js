/**
 * Главный виджет приложения для ПК.
 */
Ext.define('A.view.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'appMain',

    requires: [
        'A.view.public.Main'
    ],

    layout: 'card',

    items: [
        {
            xtype: 'appMainPublic'
        },
        {
            xtype: 'appMainClient'
        },
        {
            xtype: 'appMainPartner'
        }
    ]
});
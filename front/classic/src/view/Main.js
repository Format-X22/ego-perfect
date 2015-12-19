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
    activeItem: 1, // @TODO

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
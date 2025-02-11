/**
 * Главный виджет приложения для ПК.
 */
Ext.define('A.view.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'appMain',

    requires: [
        'A.view.main.Main'
    ],

    layout: 'card',
    activeItem: 0,

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
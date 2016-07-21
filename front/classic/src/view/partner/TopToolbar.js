/**
 * Верхний тулбар панели управления для партнеров.
 */
Ext.define('A.view.partner.TopToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'partnerTopToolbar',
    controller: 'adminTopToolbar',
    itemId: 'topToolbar',

    requires: [
        'A.view.admin.TopToolbarController'
    ],

    height: 70,
    items: [
        {
            itemId: 'exit',
            xtype: 'button',
            text: 'Выйти',
            handler: 'exit'
        },
        {
            xtype: 'component',
            flex: 1
        },
        {
            xtype: 'tbtext',
            html: 'Личный кабинет агента'
        },
        {
            xtype: 'component',
            flex: 1
        }
    ]
});
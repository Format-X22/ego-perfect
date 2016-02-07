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
            itemId: 'toSearch',
            xtype: 'button',
            text: 'На страницу поиска',
            iconCls: 'x-fa fa-search',
            handler: 'toSearch'
        },
        {
            itemId: 'exit',
            xtype: 'button',
            text: 'Выйти',
            iconCls: 'x-fa fa-lock',
            handler: 'exit'
        },
        {
            xtype: 'component',
            flex: 1
        },
        {
            xtype: 'tbtext',
            html: 'Панель партнера'
        },
        {
            xtype: 'component',
            flex: 2
        }
    ]
});
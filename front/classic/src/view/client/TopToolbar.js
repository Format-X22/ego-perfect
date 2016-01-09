/**
 * Верхний тулбар панели управления для клиентов.
 */
Ext.define('A.view.client.TopToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'clientTopToolbar',
    controller: 'adminTopToolbar',

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
            itemId: 'toDetails',
            xtype: 'button',
            text: 'На страницу вашей компании',
            iconCls: 'x-fa fa-file-text-o',
            handler: 'toDetails',
            hidden: true
        },
        {
            itemId: 'release',
            xtype: 'button',
            text: 'Разместить!',
            iconCls: 'x-fa fa-cloud-upload',
            handler: 'release',
            hidden: true
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
            html: 'Панель управления'
        },
        {
            xtype: 'component',
            flex: 2
        }
    ],

    listeners: {
        render: 'onShow'
    }
});
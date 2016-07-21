/**
 * Верхний тулбар панели управления для клиентов.
 */
Ext.define('A.view.client.TopToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'clientTopToolbar',
    controller: 'clientTopToolbar',
    itemId: 'topToolbar',

    requires: [
        'A.view.client.TopToolbarController'
    ],

    height: 70,
    items: [
        {
            itemId: 'toDetails',
            xtype: 'button',
            text: 'На страницу вашей компании',
            handler: 'toDetails'
        },
        {
            itemId: 'toSearch',
            xtype: 'button',
            text: 'На страницу поиска',
            handler: 'toSearch'
        },
        {
            itemId: 'release',
            xtype: 'button',
            text: 'Разместить!',
            handler: 'release',
            hidden: true
        },
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
            html: 'Панель управления'
        },
        {
            xtype: 'component',
            flex: 2
        },
        {
            xtype: 'tbtext',
            padding: '6 25',
            plugins: 'responsive',
            responsiveConfig: { 
                'width < 1300': {
                    html:
                        '<span>' +
                            '<a class="link link-text" href="tel:88002500186">8 (800) 25-00-186</a>' +
                        '</span>'
                },
                'width >= 1300': {
                    html:
                        '<span>' +
                            '<a class="link link-text" href="tel:88002500186">8 (800) 25-00-186</a>' +
                            ' | круглосуточно' +
                        '</span>'
                }
            }
        }
    ],

    listeners: {
        render: 'onShow'
    }
});
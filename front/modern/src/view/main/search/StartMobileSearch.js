/**
 * Стартовый скрин поиска для мобильных устройств с малым экраном.
 */
Ext.define('A.view.main.search.StartMobileSearch', {
    extend: 'Ext.Container',
    xtype: 'startMobileSearch',

    height: '100%',
    layout: {
        type: 'vbox',
        align: 'center'
    },

    items: [
        {
            flex: 1
        },
        {
            xtype: 'image',
            width: 100,
            height: 100,
            src: 'http://forum.ucoz.ru/avatar/18/264922.gif'
        },
        {
            itemId: 'searchInput',
            xtype: 'textfield',
            placeHolder: 'Введите запрос',
            width: '100%'
        },
        {
            itemId: 'searchButton',
            xtype: 'button',
            html: 'Искать',
            iconCls: 'x-fa fa-search',
            width: '100%'
        },
        {
            xtype: 'component',
            html: 'Все компании'
        },
        {
            xtype: 'component',
            html: 'на одном сайте'
        },
        {
            flex: 1
        }
    ]
});
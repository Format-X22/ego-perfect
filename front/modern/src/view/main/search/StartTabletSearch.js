/**
 * Стартовый скрин поиска для мобильных устройств с большим экраном.
 */
Ext.define('A.view.main.search.StartTabletSearch', {
    extend: 'Ext.Container',
    xtype: 'startTabletSearch',

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
            width: 150,
            height: 150,
            src: 'http://forum.ucoz.ru/avatar/18/264922.gif'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            width: '90%',
            maxWidth: 500,
            items: [
                {
                    itemId: 'searchInput',
                    xtype: 'textfield',
                    placeHolder: 'Введите запрос, например - кафе в Москве',
                    flex: 1
                },
                {
                    itemId: 'searchButton',
                    xtype: 'button',
                    html: 'Искать',
                    iconCls: 'x-fa fa-search'
                }
            ]
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
            flex: 2
        }
    ]
});
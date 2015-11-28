/**
 * Стартовый скрин поиска для мобильных устройств с большим экраном.
 */
Ext.define('A.view.main.search.StartTabletSearch', {
    extend: 'Ext.Container',
    xtype: 'startTabletSearch',

    height: '100%',
    padding: 10,
    layout: {
        type: 'vbox',
        align: 'center'
    },

    items: [
        {
            flex: 1
        },
        {
            itemId: 'img',
            xtype: 'image',
            width: 240,
            height: 150,
            src: '/resources/logo.svg'
        },
        {
            itemId: 'description',
            xtype: 'component',
            padding: '0 0 10 0',
            html: 'Все фирмы на одном сайте'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            width: '90%',
            maxWidth: 500,
            items: [
                {
                    itemId: 'searchInput',
                    xtype: 'searchfield',
                    ui: 'text',
                    cls: 'tablet-search',
                    border: 1,
                    placeHolder: 'Что ищем? Например - кафе в Москве',
                    flex: 1,
                    component: {
                        autoComplete: false,
                        autoCapitalize: false,
                        autoCorrect: false
                    },
                    listeners: {
                        focus: 'switchTabletInitToSimple',
                        blur: 'switchTabletInitToFull',
                        action: 'search'
                    }
                },
                {
                    itemId: 'searchButton',
                    xtype: 'button',
                    ui: 'search-with-text',
                    html: 'Искать',
                    iconCls: 'x-fa fa-search'
                }
            ]
        },
        {
            flex: 2
        }
    ]
});
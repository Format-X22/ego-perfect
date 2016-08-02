/**
 * Стартовый виджет поиска для мобильников.
 */
Ext.define('A.view.main.search.StartMobileSearch', {
    extend: 'Ext.Container',
    xtype: 'startMobileSearch',

    /**
     * @property {Boolean} isStartSearchContainer Является ли контейнер стартовым контейнером поиска.
     */
    isStartSearchContainer: true,

    height: '100%',
    padding: 10,
    layout: {
        type: 'vbox',
        align: 'center'
    },
    cls: 'grey-back',

    items: [
        {
            flex: 1
        },
        {
            xtype: 'image',
            width: 240,
            height: 150,
            src: '/resources/img/logo.svg'
        },
        {
            xtype: 'component',
            padding: '0 0 10 0',
            style: {
                textAlign: 'center'
            },
            html: 'Визуальная поисковая система'
        },
        {
            itemId: 'searchInput',
            xtype: 'searchfield',
            ui: 'text',
            cls: 'mobile-search',
            placeHolder: 'Что ищем?',
            width: '100%',
            listeners: {
                action: 'search'
            }
        },
        {
            itemId: 'searchButton',
            xtype: 'button',
            ui: 'search-with-text',
            html: 'Искать',
            iconCls: 'x-fa fa-search',
            width: '100%'
        },
        {
            flex: 2
        }
    ]
});
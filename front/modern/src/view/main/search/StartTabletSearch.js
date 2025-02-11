/**
 * Стартовый виджет поиска для планшетов.
 */
Ext.define('A.view.main.search.StartTabletSearch', {
    extend: 'Ext.Container',
    xtype: 'startTabletSearch',

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

    items: [
        {
            flex: 1
        },
        {
            itemId: 'img',
            xtype: 'image',
            width: 240,
            height: 150,
            src: '/resources/img/logo.svg'
        },
        {
            itemId: 'description',
            xtype: 'component',
            padding: '0 0 10 0',
            html: 'Визуальная поисковая система компаний и услуг'
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
                    placeHolder: 'Что ищем? Например - химчистка',
                    flex: 1,
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
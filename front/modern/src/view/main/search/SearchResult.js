/**
 * Вью результата поиска.
 */
Ext.define('A.view.main.search.SearchResult', {
    extend: 'Ext.Container',
    xtype: 'searchResult',

    requires: [
        'Ext.plugin.Responsive',
        'A.view.main.search.SearchResultItem',
        'A.store.Search'
    ],

    layout: 'vbox',
    height: '100%',

    items: [
        {
            xtype: 'toolbar',
            margin: '-7 0 0 0',
            items: [
                {
                    itemId: 'searchInput',
                    xtype: 'textfield',
                    cls: 'result-search',
                    placeHolder: 'Введите запрос',
                    flex: 1
                },
                {
                    itemId: 'searchButton',
                    xtype: 'button',
                    ui: 'search',
                    iconCls: 'x-fa fa-search'
                }
            ]
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            padding: '0 10',
            flex: 1,
            items: [
                {
                    xtype: 'dataview',
                    store: 'search',
                    defaultType: 'searchResultItem',
                    useComponents: true,
                    inline: true,
                    scrollable: 'vertical',
                    plugins: 'responsive',
                    responsiveConfig: {
                        'width < 320 || width >= 3220': {
                            width: '100%'
                        },
                        'width < 680 && width >= 320': {
                            width: 310
                        },
                        'width < 1000 && width >= 680': {
                            width: 660
                        },
                        'width < 1320 && width >= 1000': {
                            width: 980
                        },
                        'width < 1640 && width >= 1320': {
                            width: 1300
                        },
                        'width < 1960 && width >= 1640': {
                            width: 1620
                        },
                        'width < 2280 && width >= 1960': {
                            width: 1940
                        },
                        'width < 2600 && width >= 2280': {
                            width: 2260
                        },
                        'width < 2920 && width >= 2600': {
                            width: 2580
                        },
                        'width < 3240 && width >= 2920': {
                            width: 2900
                        }
                    }
                }
            ]
        }
    ]
});
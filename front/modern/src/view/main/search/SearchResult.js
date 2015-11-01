Ext.define('A.view.main.search.SearchResult', {
    extend: 'Ext.Container',
    xtype: 'searchResult',

    requires: [
        'A.view.main.search.SearchResultItem',
        'A.store.SearchStore'
    ],

    layout: 'vbox',
    height: '100%',

    items: [
        {
            xtype: 'toolbar',
            items: [
                {
                    itemId: 'searchInput',
                    xtype: 'textfield',
                    placeHolder: 'Введите запрос',
                    flex: 1
                },
                {
                    itemId: 'searchButton',
                    xtype: 'button',
                    iconCls: 'x-fa fa-search'
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            flex: 1,
            items: [
                {
                    flex: 1,
                    plugins: 'responsive',
                    responsiveConfig: {
                        'width < 320 || width >= 3240': {
                            hidden: true
                        },
                        'width >= 320 && width < 3240': {
                            hidden: false
                        }
                    }
                },
                {
                    xtype: 'dataview',
                    store: 'searchStore',
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
                },
                {
                    flex: 1,
                    plugins: 'responsive',
                    responsiveConfig: {
                        'width < 320 || width >= 3240': {
                            hidden: true
                        },
                        'width >= 320 && width < 3240': {
                            hidden: false
                        }
                    }
                }
            ]
        }
    ]
});
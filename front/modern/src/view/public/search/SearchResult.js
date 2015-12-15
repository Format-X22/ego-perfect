/**
 * Вью результата поиска.
 */
Ext.define('A.view.public.search.SearchResult', {
    extend: 'Ext.Container',
    xtype: 'searchResult',
    controller: 'searchResult',

    requires: [
        'Ext.plugin.Responsive',
        'A.view.public.search.SearchResultItem',
        'A.store.Search',
        'A.view.public.search.SearchResultController'
    ],

    layout: 'vbox',
    height: '100%',

    items: [
        {
            itemId: 'searchToolbar',
            xtype: 'toolbar',
            margin: '-7 0 0 0',
            items: [
                {
                    itemId: 'searchInput',
                    xtype: 'searchfield',
                    ui: 'text',
                    cls: 'result-search',
                    placeHolder: 'Что ищем?',
                    flex: 1,
                    component: {
                        autoComplete: false,
                        autoCapitalize: false,
                        autoCorrect: false
                    },
                    listeners: {
                        action: 'search'
                    }
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
            itemId: 'resultCard',
            xtype: 'container',
            layout: {
                type: 'card',
                animation: 'flip'
            },
            flex: 1,
            padding: '0 10',
            items: [
                {
                    itemId: 'searchResultContainer',
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    scrollable: 'vertical',
                    items: [
                        {
                            itemId: 'searchResult',
                            xtype: 'dataview',
                            store: 'search',
                            defaultType: 'searchResultItem',
                            useComponents: true,
                            inline: true,
                            scrollable: false,
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
                },
                {
                    itemId: 'company',
                    xtype: 'companyContainer',
                    hidden: true
                }
            ]
        }
    ]
});
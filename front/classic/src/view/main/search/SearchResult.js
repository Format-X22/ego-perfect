/**
 * Виджет результатов поиска.
 */
Ext.define('A.view.main.search.SearchResult', {
    extend: 'Ext.container.Container',
    xtype: 'searchResult',
    controller: 'searchResult',

    requires: [
        'Ext.plugin.Responsive',
        'A.store.Search',
        'A.view.main.search.SearchResultController',
        'A.view.main.company.Container'
    ],

    cls: 'search-result',
    layout: 'vbox',

    items: [
        {
            itemId: 'searchToolbar',
            xtype: 'container',
            layout: 'hbox',
            width: '100%',
            padding: 7,
            cls: 'search-toolbar',
            items: [
                {
                    itemId: 'searchInput',
                    xtype: 'textfield',
                    inputType: 'search',
                    emptyText: 'Что ищем?',
                    submitEmptyText: false,
                    flex: 2,
                    listeners: {
                        specialkey: 'searchIfEnter'
                    }
                },
                {
                    itemId: 'searchButton',
                    xtype: 'button',
                    text: 'Искать'
                },
                {
                    xtype: 'tbspacer',
                    plugins: 'responsive',
                    responsiveConfig: {
                        'width < 900': {
                            flex: 1,
                            hidden: true
                        },
                        'width < 1370 && width >= 900': {
                            flex: 1,
                            hidden: false
                        },
                        'width >= 1370': {
                            flex: 3,
                            hidden: false
                        }
                    }
                }
            ],
            listeners: {
                show: 'focusSearchInput'
            }
        },
        {
            itemId: 'resultCard',
            layout: 'card',
            flex: 1,
            width: '100%',
            items: [
                {
                    itemId: 'resultCardScrollContainer',
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    padding: '0 10',
                    width: '100%',
                    scrollable: 'vertical',
                    items: [
                        {
                            itemId: 'searchResult',
                            xtype: 'dataview',
                            store: 'search',
                            plugins: 'responsive',
                            emptyText: '<div class="search-result-empty">Ничего не найдено</div>',
                            tpl:
                                '<tpl for=".">' +
                                    '<div class="item">' +
                                    '<img src="' +
                                        'http://res.cloudinary.com/hycanb7c0/image/upload/w_300,h_300/{company}.png' +
                                    '">' +
                                    '</div>' +
                                '</tpl>',
                            itemSelector: '.item',
                            responsiveConfig: {
                                'width < 730': {
                                    width: 350
                                },
                                'width < 1080 && width >= 730': {
                                    width: 700
                                },
                                'width < 1430 && width >= 1080': {
                                    width: 1050
                                },
                                'width < 1780 && width >= 1430': {
                                    width: 1400
                                },
                                'width >= 1780': {
                                    width: 1750
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
    ],

    listeners: {
        show: 'focusSearchInput'
    }
});
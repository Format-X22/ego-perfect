/**
 * Виджет результатов поиска.
 */
Ext.define('A.view.public.search.SearchResult', {
    extend: 'Ext.container.Container',
    xtype: 'searchResult',
    controller: 'searchResult',

    requires: [
        'Ext.plugin.Responsive',
        'A.store.Search',
        'A.view.public.search.SearchResultController',
        'A.view.public.company.Container'
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
                    flex: 1,
                    maxWidth: 500,
                    listeners: {
                        specialkey: 'searchIfEnter'
                    }
                },
                {
                    itemId: 'searchButton',
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    text: 'Искать'
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
                            tpl:
                            '<tpl for=".">' +
                            '<div class="item">' +
                            '<img src="http://www.wilsoninfo.com/300x300.gif">' +
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
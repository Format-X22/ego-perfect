Ext.define('A.view.main.Search', {
    extend: 'Ext.container.Container',
    xtype: 'companySearch',

    requires: [
        'A.store.SearchStore',
        'A.view.main.SearchController'
    ],

    controller: 'search',

    layout: 'vbox',
    height: '100%',

    items: [
        {
            itemId: 'mobileSearch',
            xtype: 'toolbar',
            layout: 'hbox',
            height: 50,
            padding: 8,
            plugins: 'responsive',
            responsiveFormulas: {
                isInitMobileSearch: function () {
                    var isMobileWidth = Ext.Viewport.getWindowWidth() < 600;
                    var widget = Ext.ComponentQuery.query('#mobileInitSearch')[0];
                    var isInitMobileSearch;

                    if (widget) {
                        isInitMobileSearch = widget.isInitState;
                    } else {
                        isInitMobileSearch = true;
                    }

                    return isMobileWidth && isInitMobileSearch;
                }
            },
            responsiveConfig: {
                'width < 600': {
                    hidden: false
                },
                'width < 600 && isInitMobileSearch': {
                    hidden: true
                },
                'width >= 600': {
                    hidden: true
                }
            },
            items: [
                {
                    xtype: 'textfield',
                    placeHolder: 'Введите текст...',
                    flex: 1
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    width: 32,
                    height: 34
                }
            ]
        },
        {
            itemId: 'mobileInitSearch',
            xtype: 'container',
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            height: '100%',
            padding: 20,
            isInitState: true,
            plugins: 'responsive',
            responsiveConfig: {
                'width < 600 && isInitMobileSearch': {
                    hidden: false
                },
                'width < 600 && !isInitMobileSearch': {
                    hidden: true
                },
                'width >= 600': {
                    hidden: true
                }
            },
            items: [
                {
                    xtype: 'textfield',
                    placeHolder: 'Введите текст...'
                },
                {
                    height: 15
                },
                {
                    xtype: 'button',
                    ui: 'mobile-search',
                    html: 'Искать',
                    iconCls: 'x-fa fa-search',
                    height: 80,
                    handler: 'mobileSearch'
                },
                {
                    height: 30
                }
            ]
        },
        {
            xtype: 'toolbar',
            layout: 'hbox',
            height: 50,
            padding: 8,
            plugins: 'responsive',
            responsiveConfig: {
                'width < 600': {
                    hidden: true
                },
                'width >= 600': {
                    hidden: false
                }
            },
            items: [
                {
                    xtype: 'textfield',
                    label: 'Ищем',
                    labelWidth: 70,
                    placeHolder: 'Введите текст...',
                    flex: 1
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    width: 50,
                    height: 34
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            height: '100%',
            flex: 1,
            scrollable: 'horizontal',
            items: [
                {
                    flex: 1
                },
                {
                    xtype: 'dataview',
                    store: 'searchStore',
                    defaultType: 'companySearchResult',
                    useComponents: true,
                    inline: true,
                    maxWidth: '100%',
                    plugins: 'responsive',
                    responsiveConfig: {
                        'width < 320 && isInitMobileSearch': {
                            hidden: true,
                            width: '100%'
                        },
                        'width < 320 && !isInitMobileSearch': {
                            hidden: false,
                            width: '100%'
                        },
                        'width < 600 && width >= 320 && isInitMobileSearch': {
                            hidden: true,
                            width: 333
                        },
                        'width < 600 && width >= 320 && !isInitMobileSearch': {
                            hidden: false,
                            width: 333
                        },
                        'width < 715 && width >= 600': {
                            hidden: false,
                            width: 333
                        },
                        'width < 1047 && width >= 715': {
                            hidden: false,
                            width: 665
                        },
                        'width < 1379 && width >= 1047': {
                            hidden: false,
                            width: 998
                        },
                        'width < 1711 && width >= 1379': {
                            hidden: false,
                            width: 1330
                        },

                        'width < 2043 && width >= 1711': {
                            hidden: false,
                            width: 1662
                        },
                        'width < 2375 && width >= 2043': {
                            hidden: false,
                            width: 1994
                        },
                        'width < 2707 && width >= 2375': {
                            hidden: false,
                            width: 2326
                        },
                        'width < 3039 && width >= 2707': {
                            hidden: false,
                            width: 2658
                        },
                        'width >= 3039': {
                            hidden: false,
                            width: '100%'
                        }
                    }
                },
                {
                    flex: 1
                }
            ]
        }
    ]
});
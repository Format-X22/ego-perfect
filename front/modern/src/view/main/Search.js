Ext.define('A.view.main.Search', {
    extend: 'Ext.container.Container',
    xtype: 'companySearch',

    requires: [
        'A.store.SearchStore'
    ],

    layout: 'vbox',
    height: '100%',

    items: [
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
                    xtype: 'selectfield',
                    label: 'Город',
                    labelWidth: 70,
                    plugins: 'responsive',
                    responsiveConfig: {
                        'width < 900': {
                            width: 200
                        },
                        'width >= 900': {
                            width: 250
                        }
                    }
                },
                {
                    width: 10
                },
                {
                    xtype: 'textfield',
                    label: 'Ищем',
                    labelWidth: 70,
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
            layout: 'vbox',
            height: '100%',
            plugins: 'responsive',
            responsiveConfig: {
                'width < 600': {
                    hidden: false
                },
                'width >= 600': {
                    hidden: true
                }
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'selectfield',
                            label: 'Город',
                            labelAlign: 'top',
                            margin: '0 0 7 0'
                        },
                        {
                            xtype: 'textfield',
                            label: 'Ищем',
                            labelAlign: 'top',
                            margin: '0 0 7 0'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'button',
                            ui: 'mobile-search',
                            html: 'Искать',
                            iconCls: 'x-fa fa-search',
                            height: 80
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            height: '100%',
            flex: 1,
            margin: '0 10',
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
                    plugins: 'responsive',
                    maxWidth: '100%',
                    responsiveConfig: {
                        'width < 320': {
                            hidden: true,
                            width: '100%'
                        },
                        'width < 600 && width >= 320': {
                            hidden: true,
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
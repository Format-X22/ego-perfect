Ext.define('A.view.main.Search', {
    extend: 'Ext.container.Container',
    xtype: 'companySearch',

    layout: 'vbox',
    height: '100%',

    items: [
        {
            xtype: 'container',
            layout: 'hbox',
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
                    xtype: 'textfield',
                    label: 'Ищем',
                    labelWidth: 70,
                    flex: 1
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    width: 102,
                    height: 34,
                    margin: '0 0 0 10'
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
            xtype: 'dataview',
            plugins: 'responsive',
            flex: 1,
            responsiveConfig: {
                'width < 600': {
                    hidden: true
                },
                'width >= 600': {
                    hidden: false
                }
            }
        }
    ]
});
Ext.define('A.view.main.company.Container', {
    extend: 'Ext.Container',
    xtype: 'companyContainer',
    viewModel: 'companyContainer',

    requires: [
        'A.view.main.company.Summary',
        //'A.view.main.company.Gallery',
        //'A.view.main.company.Reviews',
        //'A.view.main.company.Map'
    ],

    layout: 'vbox',

    items: [
        {
            xtype: 'toolbar',
            hidden: true,
            bind: {
                title: '{name}'
            },
            items: [
                '->',
                {
                    itemId: 'backToSearch',
                    xtype: 'button',
                    text: 'Назад',
                    iconCls: 'x-fa fa-chevron-left',
                    plugins: 'responsive',
                    responsiveConfig: {
                        'width < 600 || height < 500': {
                            hidden: true
                        },
                        'width >= 600 && height >= 500': {
                            hidden: false
                        }
                    }
                }
            ]
        },
        {
            xtype: 'tabpanel',
            flex: 1,
            tabBarPosition: 'top',
            layout: {
                type: 'card',
                animation: 'flip'
            },
            defaults: {
                tab: {
                    iconAlign: 'top',
                    flex: 1,
                    labelCls: 'no-tab-label'
                },
                styleHtmlContent: true
            },
            items: [
                {
                    iconCls: 'x-fa fa-file-text-o',
                    xtype: 'companySummary'
                },
                {
                    iconCls: 'x-fa fa-image',
                    //xtype: 'companyGallery'
                },
                {
                    iconCls: 'x-fa fa-eye',
                    //xtype: 'companyReviews'
                },
                {
                    iconCls: 'x-fa fa-map-o',
                    //xtype: 'companyMap'
                }
            ]
        }
    ]
});
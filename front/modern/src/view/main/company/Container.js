Ext.define('A.view.main.company.Container', {
    extend: 'Ext.Container',

    requires: [
        'A.view.main.company.Summary',
        'A.view.main.company.Gallery',
        'A.view.main.company.Reviews',
        'A.view.main.company.Map'
    ],

    layout: 'vbox',

    items: [
        {
            xtype: 'toolbar',
            bind: {
                title: '{companyName}'
            },
            items: [
                {
                    xtype: 'button',
                    text: 'Назад'
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
            items: [
                {
                    iconCls: 'x-fa fa-file-text-o',
                    xtype: 'companySummary'
                },
                {
                    iconCls: 'x-fa fa-image',
                    xtype: 'companyGallery'
                },
                {
                    iconCls: 'x-fa fa-eye',
                    xtype: 'companyReviews'
                },
                {
                    iconCls: 'x-fa fa-map-o',
                    xtype: 'companyMap'
                }
            ]
        }
    ]
});
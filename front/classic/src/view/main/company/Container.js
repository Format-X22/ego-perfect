Ext.define('A.view.main.company.Container', {
    extend: 'Ext.tab.Panel',
    xtype: 'companyContainer',
    viewModel: 'companyContainer',

    requires: [
        'A.view.main.company.Summary',
        'A.view.main.company.Map'
    ],

    tabBarPosition: 'top',

    items: [
        {
            xtype: 'companySummary',
            iconCls: 'x-fa fa-file-text-o',
            title: 'Описание'
        },
        {
            iconCls: 'x-fa fa-image',
            title: 'Фотографии'
        },
        {
            iconCls: 'x-fa fa-eye',
            title: 'Отзывы'
        },
        {
            xtype: 'companyMap',
            iconCls: 'x-fa fa-map-o',
            title: 'На карте'
        }
    ]
});
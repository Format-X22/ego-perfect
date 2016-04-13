/**
 * Контейнер деталей компании.
 */
Ext.define('A.view.main.company.Container', {
    extend: 'Ext.panel.Panel',
    xtype: 'companyContainer',
    viewModel: 'companyContainer',

    requires: [
        'A.view.main.company.Summary',
        'A.view.main.company.Gallery',
        'A.view.main.company.reviews.Container',
        'A.view.main.company.Map'
    ],

    layout: 'fit',

    tbar: [
        {
            itemId: 'backToSearch',
            xtype: 'button',
            text: 'Назад',
            iconCls: 'x-fa fa-chevron-left'
        },
        {
            itemId: 'backToAdmin',
            xtype: 'button',
            text: 'Назад в панель редактирования',
            iconCls: 'x-fa fa-chevron-left',
            hidden: true
        },
        {
            itemId: 'backToSearchFromAdmin',
            xtype: 'button',
            text: 'На страницу поиска',
            iconCls: 'x-fa fa-search',
            hidden: true
        },
        '->',
        {
            xtype: 'tbtext',
            bind: {
                html: '<b>{name}</b>'
            }
        },
        '->'
    ],

    items: [
        {
            companyDetailsTabPanel: true,
            xtype: 'tabpanel',
            tabBarPosition: 'top',
            flex: 1,
            items: [
                {
                    itemId: 'summary',
                    xtype: 'companySummary',
                    iconCls: 'x-fa fa-file-text-o',
                    title: 'Описание'
                },
                {
                    itemId: 'gallery',
                    xtype: 'companyGallery',
                    iconCls: 'x-fa fa-image',
                    title: 'Фотографии'
                },
                {
                    itemId: 'reviews',
                    xtype: 'companyReviewsContainer',
                    iconCls: 'x-fa fa-eye',
                    title: 'Отзывы'
                },
                {
                    itemId: 'map',
                    xtype: 'companyMap',
                    iconCls: 'x-fa fa-map-o',
                    title: 'На карте'
                }
            ]
        }
    ]
});
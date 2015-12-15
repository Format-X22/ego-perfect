/**
 * Контейнер деталей компании.
 */
Ext.define('A.view.public.company.Container', {
    extend: 'Ext.panel.Panel',
    xtype: 'companyContainer',
    viewModel: 'companyContainer',

    requires: [
        'A.view.public.company.Summary',
        'A.view.public.company.Gallery',
        'A.view.public.company.reviews.Container',
        'A.view.public.company.Map'
    ],

    layout: 'fit',

    tbar: [
        {
            itemId: 'backToSearch',
            xtype: 'button',
            text: 'Назад',
            iconCls: 'x-fa fa-chevron-left'
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
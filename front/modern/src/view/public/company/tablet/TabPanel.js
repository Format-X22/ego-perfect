/**
 * Таб-панель деталей компании для планшетов.
 */
Ext.define('A.view.public.company.tablet.TabPanel', {
    extend: 'A.view.public.company.AbstractTabPanel',
    xtype: 'companyTabPanelTablet',

    requires: [
        'A.view.public.company.tablet.Summary',
        'A.view.public.company.tablet.reviews.Container',
        'A.view.public.company.Gallery',
        'A.view.public.company.Map'
    ],

    height: '100%',

    items: [
        {
            itemId: 'summary',
            xtype: 'companySummaryTablet',
            iconCls: 'x-fa fa-file-text-o'
        },
        {
            itemId: 'gallery',
            xtype: 'companyGallery',
            iconCls: 'x-fa fa-image'
        },
        {
            itemId: 'reviews',
            xtype: 'companyTabletReviewsContainer',
            iconCls: 'x-fa fa-eye'
        },
        {
            itemId: 'map',
            xtype: 'companyMap',
            iconCls: 'x-fa fa-map-o'
        }
    ]
});
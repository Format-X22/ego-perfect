/**
 * Таб-панель деталей компании для мобильников.
 */
Ext.define('A.view.public.company.mobile.TabPanel', {
    extend: 'A.view.public.company.AbstractTabPanel',
    xtype: 'companyTabPanelMobile',

    requires: [
        'A.view.public.company.mobile.Summary',
        'A.view.public.company.Gallery',
        'A.view.public.company.Map'
    ],

    items: [
        {
            itemId: 'summary',
            xtype: 'companySummaryMobile',
            iconCls: 'x-fa fa-file-text-o'
        },
        {
            itemId: 'gallery',
            xtype: 'companyGallery',
            iconCls: 'x-fa fa-image'
        },
        {
            itemId: 'reviews',
            xtype: 'companyMobileReviewsContainer',
            iconCls: 'x-fa fa-eye'
        },
        {
            itemId: 'map',
            xtype: 'companyMap',
            iconCls: 'x-fa fa-map-o'
        }
    ]
});
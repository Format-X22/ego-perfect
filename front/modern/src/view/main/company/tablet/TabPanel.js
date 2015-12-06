/**
 * Таб-панель деталей компании для планшетов.
 */
Ext.define('A.view.main.company.tablet.TabPanel', {
    extend: 'A.view.main.company.AbstractTabPanel',
    xtype: 'companyTabPanelTablet',

    requires: [
        'A.view.main.company.tablet.Summary',
        'A.view.main.company.tablet.reviews.Container',
        'A.view.main.company.Gallery',
        'A.view.main.company.Map'
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
/**
 * Таб-панель деталей компании для мобильников.
 */
Ext.define('A.view.main.company.mobile.TabPanel', {
    extend: 'A.view.main.company.AbstractTabPanel',
    xtype: 'companyTabPanelMobile',

    requires: [
        'A.view.main.company.mobile.Summary',
        'A.view.main.company.Gallery',
        'A.view.main.company.Map'
    ],

    items: [
        {
            xtype: 'companySummaryMobile',
            iconCls: 'x-fa fa-file-text-o'
        },
        {
            xtype: 'companyGallery',
            iconCls: 'x-fa fa-image'
        },
        {
            iconCls: 'x-fa fa-eye'
        },
        {
            xtype: 'companyMap',
            iconCls: 'x-fa fa-map-o'
        }
    ]
});
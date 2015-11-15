Ext.define('A.view.main.company.mobile.TabPanel', {
    extend: 'A.view.main.company.AbstractTabPanel',
    xtype: 'companyTabPanelMobile',

    requires: [
        'A.view.main.company.mobile.Summary'
    ],

    items: [
        {
            iconCls: 'x-fa fa-file-text-o',
            xtype: 'companySummaryMobile'
        },
        {
            iconCls: 'x-fa fa-image'
        },
        {
            iconCls: 'x-fa fa-eye'
        },
        {
            iconCls: 'x-fa fa-map-o'
        }
    ]
});
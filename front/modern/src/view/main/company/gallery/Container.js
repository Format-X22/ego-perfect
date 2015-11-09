Ext.define('A.view.main.company.gallery.Container', {
    extend: 'Ext.Container',
    xtype: 'companyGallery',

    layout: 'card',

    items: [
        {
            xtype: 'dataview'
        },
        {
            xtype: 'imageViewer'
        }
    ]
});
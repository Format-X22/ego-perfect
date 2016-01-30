/**
 * Галерея фото.
 */
Ext.define('A.view.main.company.Gallery', {
    extend: 'Ext.container.Container',
    xtype: 'companyGallery',
    controller: 'companyGallery',

    layout: {
        type: 'hbox',
        align: 'stretch',
        pack: 'center'
    },

    items: [
        {
            xtype: 'button',
            iconCls: 'x-fa fa-chevron-left',
            width: 100,
            handler: 'prevPage'
        },
        {
            xtype: 'container',
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'image'
                }
            ]
        },
        {
            xtype: 'button',
            iconCls: 'x-fa fa-chevron-right',
            width: 100,
            handler: 'nextPage'
        }
    ]
});
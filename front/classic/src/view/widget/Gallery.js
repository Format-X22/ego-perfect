/**
 * Галерея фото.
 */
Ext.define('A.view.widget.Gallery', {
    extend: 'Ext.container.Container',
    xtype: 'gallery',
    controller: 'gallery',
    
    requires: [
        'A.view.widget.GalleryController'
    ],

    layout: {
        type: 'hbox',
        align: 'stretch',
        pack: 'center'
    },

    margin: '20 0',

    items: [
        {
            xtype: 'button',
            iconCls: 'x-fa fa-chevron-left',
            width: 100,
            margin: '10 10 10 0',
            handler: 'prevImage'
        },
        {
            itemId: 'imageContainer',
            xtype: 'container',
            layout: 'fit',
            flex: 1,
            margin: 10,
            items: (function () {
                var items = [];

                for (var i = 0; i < 10; i++) {
                    items.push({
                        itemId: 'image' + i,
                        xtype: 'image',
                        alt: 'Фотография ' + i,
                        hidden: true
                    });
                }

                items[0].hidden = false;

                return items;
            })()
        },
        {
            xtype: 'button',
            iconCls: 'x-fa fa-chevron-right',
            width: 100,
            margin: '10 0 10 10',
            handler: 'nextImage'
        }
    ]
});
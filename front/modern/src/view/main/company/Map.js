Ext.define('A.view.main.company.Map', {
    extend: 'Ext.Container',
    xtype: 'companyMap',
    controller: 'companyMapController',

    requires: [
        'A.view.main.company.MapController'
    ],

    layout: 'vbox',

    items: [
        {
            xtype: 'component',
            padding: 20,
            bind: {
                html: '{address}'
            }
        },
        {
            itemId: 'mapContainer',
            xtype: 'container',
            layout: 'fit',
            width: '100%',
            flex: 1
        }
    ],

    listeners: {
        show: function () {
            if (this.down('map')) {
                return;
            }

            this.down('#mapContainer').add({
                xtype: 'map',
                mapOptions: {
                    zoom: 17
                }
            })
        }
    }
});
/**
 * Карта для деталей компании.
 */
Ext.define('A.view.main.company.Map', {
    extend: 'Ext.Container',
    xtype: 'companyMap',
    controller: 'companyMap',

    requires: [
        'A.view.main.company.MapController',
        'Ext.ux.GMapPanel'
    ],

    layout: 'vbox',

    items: [
        {
            xtype: 'component',
            bind: {
                html: '{address}'
            },
            padding: 20
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
            this.initMapComponent();
        }
    },

    privates: {

        /**
         * @private
         */
        initMapComponent: function () {
            if (this.down('gmappanel')) {
                return;
            }

            this.down('#mapContainer').add({
                xtype: 'gmappanel',
                mapOptions: {
                    zoom: 17,
                    center: {
                        lat: 0,
                        lng: 0
                    }
                }
            });
        }
    }
});
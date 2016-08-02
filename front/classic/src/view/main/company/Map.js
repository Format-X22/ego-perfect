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
    cls: 'no-gray-back',

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
        initMapComponent: function self () {
            if (this.down('gmappanel')) {
                return;
            }

            if (!window['google']) {
                Ext.defer(self, 100, this);
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
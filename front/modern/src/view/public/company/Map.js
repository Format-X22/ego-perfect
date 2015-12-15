/**
 * Виджет карты для деталей компании.
 */
Ext.define('A.view.public.company.Map', {
    extend: 'Ext.Container',
    xtype: 'companyMap',
    controller: 'companyMap',

    requires: [
        'A.view.public.company.MapController'
    ],

    layout: 'vbox',

    items: [
        {
            xtype: 'component',
            bind: {
                html: '{address}'
            },
            plugins: 'responsive',
            responsiveConfig: {
                'width < 600 || height < 400': {
                    padding: '5 10'
                },
                'width >= 600 && height >= 400': {
                    padding: 20
                }
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
            this.initMapComponent();
        }
    },

    privates: {

        /**
         * @private
         */
        initMapComponent: function () {
            if (this.down('map')) {
                return;
            }

            this.down('#mapContainer').add({
                xtype: 'map',
                mapOptions: {
                    zoom: 17
                }
            });
        }
    }
});
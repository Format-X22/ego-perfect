Ext.define('A.view.main.company.Map', {
    extend: 'Ext.Container',
    xtype: 'companyMap',
    controller: 'companyMapController',

    requires: [
        'A.view.main.company.MapController'
    ],

    layout: 'fit',

    listeners: {
        show: function () {
            if (this.down('map')) {
                return;
            }

            this.add({
                xtype: 'map',
                mapOptions: {
                    zoom: 17
                }
            })
        }
    }
});
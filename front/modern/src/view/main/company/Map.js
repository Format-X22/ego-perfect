Ext.define('A.view.main.company.Map', {
    extend: 'Ext.Container',
    xtype: 'companyMap',
    controller: 'companyMapController',

    requires: [
        'A.view.main.company.MapController'
    ],

    layout: 'fit',

    items: [
        {
            xtype: 'map',
            mapOptions: {
                zoom: 17
            }
        }
    ]
});
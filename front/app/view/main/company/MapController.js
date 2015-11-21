Ext.define('A.view.main.company.MapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.companyMapController',

    control: {
        'companyMap': {
            show: 'renewMap'
        }
    },

    renewMap: function () {
        this.waitForAnimation(function () {
            this.centerToCurrent();
            this.makeNewMarkerIfNeed();
            this.setMarkerToCurrent();
        });
    },

    waitForAnimation: function (callback) {
        Ext.defer(callback, 300, this);
    },

    centerToCurrent: function () {
        this.getMap().getMap().setCenter(this.getPosition());
    },

    getMap: function () {
        return this.getView().down('map');
    },

    getPosition: function () {
        return {
            lat: this.getLat(),
            lng: this.getLng()
        };
    },

    getLat: function () {
        return this.getMapModel().get('lat');
    },

    getLng: function () {
        return this.getMapModel().get('lng');
    },

    getMapModel: function () {
        return this.getCompanyViewModel().get('map').first();
    },

    getCompanyViewModel: function () {
        return this.getView().up('companyContainer').getViewModel();
    },

    makeNewMarkerIfNeed: function () {
        if (!this.getMarker()) {
            this.setMarker(this.createMarker());
        }
    },

    getMarker: function () {
        return this.getCompanyViewModel().get('mapMarker');
    },

    setMarker: function (value) {
        return this.getCompanyViewModel().set('mapMarker', value);
    },

    createMarker: function () {
        return new google.maps.Marker({
            map: this.getMap().getMap()
        });
    },

    setMarkerToCurrent: function () {
        this.getMarker().setPosition(this.getPosition());
    }
});
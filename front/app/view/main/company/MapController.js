/**
 *
 */
Ext.define('A.view.main.company.MapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.companyMapController',

    control: {
        'companyMap': {
            show: 'renewMap'
        }
    },

    /**
     *
     */
    renewMap: function () {
        this.waitForAnimation(function () {
            this.centerToCurrent();
            this.makeNewMarkerIfNeed();
            this.setMarkerToCurrent();
        });
    },

    /**
     *
     * @param callback
     */
    waitForAnimation: function (callback) {
        var time = 300;

        if (Ext.isClassic) {
            time = 1;
        }

        Ext.defer(callback, time, this);
    },

    /**
     *
     */
    centerToCurrent: function () {
        this.getGoogleMapObject().setCenter(this.getPosition());
    },

    /**
     *
     * @returns {*}
     */
    getGoogleMapObject: function () {
        var map = this.getMap();

        if (Ext.isClassic) {
            return map.gmap;
        } else {
            return map.getMap();
        }
    },

    /**
     *
     * @returns {*}
     */
    getMap: function () {
        var selector = 'map';

        if (Ext.isClassic) {
            selector = 'gmappanel';
        }

        return this.getView().down(selector);
    },

    /**
     *
     * @returns {{lat: *, lng: *}}
     */
    getPosition: function () {
        return {
            lat: this.getLat(),
            lng: this.getLng()
        };
    },

    /**
     *
     * @returns {*}
     */
    getLat: function () {
        return this.getMapModel().get('lat');
    },

    /**
     *
     * @returns {*}
     */
    getLng: function () {
        return this.getMapModel().get('lng');
    },

    /**
     *
     * @returns {*}
     */
    getMapModel: function () {
        return this.getCompanyViewModel().get('map').first();
    },

    /**
     *
     * @returns {*|Ext.app.ViewModel}
     */
    getCompanyViewModel: function () {
        return this.getView().up('companyContainer').getViewModel();
    },

    /**
     *
     */
    makeNewMarkerIfNeed: function () {
        if (!this.getMarker()) {
            this.setMarker(this.createMarker());
        }
    },

    /**
     *
     * @returns {*|Object}
     */
    getMarker: function () {
        return this.getCompanyViewModel().get('mapMarker');
    },

    /**
     *
     * @param value
     * @returns {*}
     */
    setMarker: function (value) {
        return this.getCompanyViewModel().set('mapMarker', value);
    },

    /**
     *
     * @returns {google.maps.Marker}
     */
    createMarker: function () {
        return new google.maps.Marker({
            map: this.getGoogleMapObject()
        });
    },

    /**
     *
     */
    setMarkerToCurrent: function () {
        this.getMarker().setPosition(this.getPosition());
    }
});
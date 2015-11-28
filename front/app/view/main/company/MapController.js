/**
 * Вью-контроллер карты.
 */
Ext.define('A.view.main.company.MapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.companyMap',

    control: {
        'companyMap': {
            show: 'renewMap'
        }
    },

    /**
     * Обновляет карту по текущим данным.
     */
    renewMap: function () {
        this.waitForAnimation(function () {
            this.centerToCurrent();
            this.makeNewMarkerIfNeed();
            this.setMarkerToCurrent();
        });
    },

    privates: {

        /**
         * @private
         * @param {} callback
         */
        waitForAnimation: function (callback) {
            var time = 300;

            if (Ext.isClassic) {
                time = 1;
            }

            Ext.defer(callback, time, this);
        },

        /**
         * @private
         */
        centerToCurrent: function () {
            this.getGoogleMapObject().setCenter(this.getPosition());
        },

        /**
         * @private
         * @return {}
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
         * @private
         * @return {}
         */
        getMap: function () {
            var selector = 'map';

            if (Ext.isClassic) {
                selector = 'gmappanel';
            }

            return this.getView().down(selector);
        },

        /**
         * @private
         * @return {}
         */
        getPosition: function () {
            return {
                lat: this.getLat(),
                lng: this.getLng()
            };
        },

        /**
         * @private
         * @return {}
         */
        getLat: function () {
            return this.getMapModel().get('lat');
        },

        /**
         * @private
         * @return {}
         */
        getLng: function () {
            return this.getMapModel().get('lng');
        },

        /**
         * @private
         * @return {}
         */
        getMapModel: function () {
            return this.getCompanyViewModel().get('map').first();
        },

        /**
         * @private
         * @return {Ext.app.ViewModel}
         */
        getCompanyViewModel: function () {
            return this.getView().up('companyContainer').getViewModel();
        },

        /**
         * @private
         */
        makeNewMarkerIfNeed: function () {
            if (!this.getMarker()) {
                this.setMarker(this.createMarker());
            }
        },

        /**
         * @private
         * @return {}
         */
        getMarker: function () {
            return this.getCompanyViewModel().get('mapMarker');
        },

        /**
         * @private
         * @param {} value
         * @return {}
         */
        setMarker: function (value) {
            return this.getCompanyViewModel().set('mapMarker', value);
        },

        /**
         * @private
         * @returns {google.maps.Marker}
         */
        createMarker: function () {
            return new google.maps.Marker({
                map: this.getGoogleMapObject()
            });
        },

        /**
         * @private
         */
        setMarkerToCurrent: function () {
            this.getMarker().setPosition(this.getPosition());
        }
    }
});
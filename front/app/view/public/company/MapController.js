/**
 * Вью-контроллер карты.
 */
Ext.define('A.view.public.company.MapController', {
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
         * @param {Function} callback Следующий шаг.
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
         * @return {google.maps.Map} Объект карты Google.
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
         * @return {Ext.ux.GMapPanel/Ext.Map} Компонент карты.
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
         * @return {Object} Объект с lat и lng.
         */
        getPosition: function () {
            return {
                lat: this.getLat(),
                lng: this.getLng()
            };
        },

        /**
         * @private
         * @return {Number} Координата lat.
         */
        getLat: function () {
            return this.getMapModel().get('lat');
        },

        /**
         * @private
         * @return {Number} Координата lng.
         */
        getLng: function () {
            return this.getMapModel().get('lng');
        },

        /**
         * @private
         * @return {Ext.data.Model} Рекорд карты.
         */
        getMapModel: function () {
            return this.getCompanyViewModel().get('map').first();
        },

        /**
         * @private
         * @return {Ext.app.ViewModel} Вью-модель компании.
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
         * @return {google.maps.Marker} Объект маркера карты Google.
         */
        getMarker: function () {
            return this.getCompanyViewModel().get('mapMarker');
        },

        /**
         * @private
         * @param {google.maps.Marker} value Объект маркера карты Google.
         */
        setMarker: function (value) {
            this.getCompanyViewModel().set('mapMarker', value);
        },

        /**
         * @private
         * @return {google.maps.Marker} Объект маркера карты Google.
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
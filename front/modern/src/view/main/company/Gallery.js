/**
 * Виджет галереи.
 */
Ext.define('A.view.main.company.Gallery', {
    extend: 'Ext.carousel.Carousel',
    xtype: 'companyGallery',

    width: 0,

    items: (function () {
        var config = [];

        for (var i = 0; i < 8; i++) { // @TODO 10
            config.push({
                xtype: 'image',
                src: '/resources/gallery/tmp/' + (i + 1) + '.JPG' // @TODO bind
            });
        }

        return config;
    })(),

    /**
     * @inheritdoc
     */
    initialize: function () {
        this.on({
            scope: this,
            show: this.fixSlideOnShow,
            hide: this.fixSlideOnHide
        });
    },

    privates: {

        /**
         * @private
         */
        fixSlideOnShow: function () {
            Ext.defer(function () {
                this.setWidth(null);
            }, 550, this);
        },

        /**
         * @private
         */
        fixSlideOnHide: function () {
            this.setWidth(0);
        }
    }
});
/**
 * Виджет галереи.
 */
Ext.define('A.view.main.company.Gallery', {
    extend: 'Ext.carousel.Carousel',
    xtype: 'companyGallery',
    controller: 'companyGallery',

    width: 0,

    items: (function () {
        var config = [];

        for (var i = 0; i < 10; i++) {
            config.push({
                xtype: 'image',
                src: ''
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

    listeners: {
        show: 'refresh',
        resize: 'refresh'
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
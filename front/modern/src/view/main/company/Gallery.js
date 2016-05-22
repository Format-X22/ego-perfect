/**
 * Виджет галереи.
 */
Ext.define('A.view.main.company.Gallery', {
    extend: 'Ext.carousel.Carousel',
    xtype: 'companyGallery',
    controller: 'companyGallery',

    items: (function () {
        var config = [];

        for (var i = 0; i < 10; i++) {
            config.push({
                xtype: 'image',
                src: '',
                style: {
                    backgroundSize: 'auto'
                }
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
            show: this.fixSlideOnShow
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
                this.onSizeChange(); // @TODO [VERSION HACK]
                                     // Вызов приватного метода, который фиксит карусель,
                                     // других адекватных путей без побочных эффектов - не найдено.
            }, 550, this);
        }
    }
});
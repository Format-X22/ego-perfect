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

    /**
     * @protected
     * Фикс наложения фото друг на друга, причина - не верное определение ширины.
     * Жестко установлена ширина, равная текущей ширине экрана.
     */
    refreshSizing: function() {
        var element = this.element,
            itemLength = this.getItemLength(),
            translatableItemLength = {
                x: 0,
                y: 0
            },
            itemOffset, containerSize;

        if (this.getDirection() === 'horizontal') {
            //containerSize = element.getWidth(); FIXED
            containerSize = Ext.getBody().getWidth(); // @TODO [VERSION HACK] фикс ширины
        }
        else {
            containerSize = element.getHeight();
        }

        this.hiddenTranslation = -containerSize;

        if (itemLength === null) {
            itemLength = containerSize;
            itemOffset = 0;
        }
        else {
            itemOffset = (containerSize - itemLength) / 2;
        }

        this.itemLength = itemLength;
        this.itemOffset = itemOffset;
        translatableItemLength[this.currentAxis] = itemLength;
        this.getTranslatable().setItemLength(translatableItemLength);
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
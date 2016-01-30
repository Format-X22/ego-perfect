/**
 * Контроллер галереи фото.
 */
Ext.define('A.view.main.company.GalleryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.companyGallery',

    config: {

        /**
         * @private
         * @cfg {Number} imageIndex Индекс текущей картинки.
         */
        imageIndex: 0,

        /**
         * @private
         * @cfg {Number} maxImageIndex Максимальный индекс картинки.
         */
        maxImageIndex: 9,

        /**
         * @private
         * @cfg {Number} widgetSize Размер виджета.
         */
        widgetSize: 0,

        /**
         * @private
         * @cfg {Object[]} imagesData Данные картинок.
         */
        imagesData: null,

        /**
         * @private
         * @cfg {Object[]} imagesSize Размеры картинок.
         */
        imagesSize: null
    },

    /**
     * Установка картинок в виджет.
     * @param {Object[]} images Массив объектов данных картинок.
     */
    setImages: function (images) {
        this.setImagesData(images);

        this.clearImageView();

        if (this.getView().rendered) {
            this.updateImages();
        } else {
            this.on('render', function () {
                this.updateImages();
            }, this, {single: true});
        }
    },

    /**
     * Переустановка картинок в виджет.
     * Может быть необходима при ресайзе виджета.
     */
    resetImages: function () {
        this.setImages(this.getImagesData());
    },

    /**
     * Показ предыдущей картинки.
     */
    prevImage: function () {
        var index = this.getImageIndex() - 1;

        if (index < 0) {
            index = this.getMaxImageIndex();
        }

        this.updateImageViewUseIndex(index);
    },

    /**
     * Показ следующей картинки.
     */
    nextImage: function () {
        var index = this.getImageIndex() + 1;

        if (index > this.getMaxImageIndex()) {
            index = 0;
        }

        this.updateImageViewUseIndex(index);
    },

    privates: {

        /**
         * @private
         */
        updateImages: function () {
            this.calculateWidgetSize();
            this.calculateImagesSize();
            this.updateImageView();
        },

        /**
         * @private
         */
        clearImageView: function () {
            this.getImageView().setSrc('');
        },

        /**
         * @private
         */
        calculateWidgetSize: function () {
            var dom = this.getImageView().getEl().dom;

            this.setWidgetSize({
                width: dom.width,
                height: dom.height
            });
        },

        /**
         * @private
         */
        calculateImagesSize: function () {
            this.resetImagesSize();
            Ext.each(this.getImagesData(), this.calculateOneImageSize, this);
        },

        /**
         * @private
         */
        resetImagesSize: function () {
            this.setImagesSize([]);
        },

        /**
         * @private
         * @param {Object} image Объект данных картинки.
         * @param {Number} index Индекс картинки.
         */
        calculateOneImageSize: function (image, index) {
            // @TODO

            this.getImagesSize().push({
                width: 100, // @TODO
                height: 100 // @TODO
            });
        },

        /**
         * @private
         * @param {Number} index Индекс картинки.
         */
        updateImageViewUseIndex: function (index) {
            this.updateImageView(Ext.apply(
                {},
                this.getImagesData()[index],
                this.getImagesSize()[index]
            ));
        },

        /**
         * @private
         * @param {Object} image Объект данных картинки.
         */
        updateImageView: function (image) {
            if (!image) {
                image = Ext.apply(
                    {},
                    this.getImagesData()[0],
                    this.getImagesSize()[0]
                );
            }

            this.getImageView().setWidth(image.width);
            this.getImageView().setHeight(image.height);
            this.getImageView().setSrc(image.src);
        },

        /**
         * @private
         * @return {Ext.Img} Виджет картинки.
         */
        getImageView: function () {
            return this.getView().down('image');
        }
    }
});
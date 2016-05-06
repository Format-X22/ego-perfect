/**
 * Контроллер галереи фото.
 */
Ext.define('A.view.widget.GalleryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gallery',

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
         * @cfg {Object[]} imagesData Данные картинок.
         */
        imagesData: null
    },

    /**
     * Установка картинок в виджет.
     * @param {Object[]} images Массив объектов данных картинок.
     */
    setImages: function (images) {
        this.setImageIndex(0);
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
        var oldIndex = this.getImageIndex();
        var index = oldIndex - 1;

        if (index < 0) {
            index = this.getMaxImageIndex();
        }

        this.getImageView(oldIndex).hide();
        this.setImageIndex(index);
        this.getImageView(index).show();
    },

    /**
     * Показ следующей картинки.
     */
    nextImage: function () {
        var oldIndex = this.getImageIndex();
        var index = oldIndex + 1;

        if (index > this.getMaxImageIndex()) {
            index = 0;
        }

        this.getImageView(oldIndex).hide();
        this.setImageIndex(index);
        this.getImageView(index).show();
    },

    /**
     * Обновляет вью, наполняя данными.
     */
    refresh: function () {
        var view = this.getView();
        var id = this.getEntityId();
        var images = [];
        var tplString = 
            'http://res.cloudinary.com/hycanb7c0/image/upload/q_75,c_pad,w_{width},h_{height}/{name}.jpg';
        var tpl = new Ext.Template(tplString);

        if (!view.rendered) {
            view.on('show', this.refresh, this, {single: true});
            return;
        }
        
        for (var i = 0; i <= this.getMaxImageIndex(); i++) {
            images.push({
                src: tpl.apply({
                    name: id + '_' + (i + 1),
                    width: view.getWidth() - 240,
                    height: view.up().getHeight() - 84
                })
            });
        }

        this.setImages(images);
    },

    /**
     * @protected
     * @return {String} ID сущности для которой имеются фото.
     */
    getEntityId: function () {
        return this.getViewModel().get('_id');
    },

    privates: {

        /**
         * @private
         */
        updateImages: function () {
            this.updateImagesView();
        },

        /**
         * @private
         */
        clearImageView: function () {
            var view;

            for (var i = 0; i <= this.getMaxImageIndex(); i++) {
                view = this.getImageView(i);

                view.setSrc('');
                view.hide();
            }

            this.getImageView(0).show();
        },

        /**
         * @private
         */
        updateImagesView: function () {
            for (var i = 0; i <= this.getMaxImageIndex(); i++) {
                this.getImageView(i).setSrc(this.getImagesData()[i].src);
            }
        },

        /**
         * @private
         * @param {Number} index Индекс вью.
         * @return {Ext.Img} Виджет картинки.
         */
        getImageView: function (index) {
            return this.getView().down('#image' + index);
        }
    }
});
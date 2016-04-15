/**
 * Контроллер галереи.
 */
Ext.define('A.view.main.company.GalleryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.companyGallery',

    /**
     * Обновляет вью галереи.
     */
    refresh: function () {
        var images = this.getImages();
        var tpl = this.getSrcTpl();

        Ext.each(images, function (image, index) {
            image.setSrc(tpl.apply({
                name: this.getImageName(index),
                width: this.getWidth(),
                height: this.getHeight()
            }));
        }, this);

        this.getView().setActiveItem(0);
    },

    privates: {

        /**
         * @private
         * @return {Ext.Img[]} Массив виджетов картинок.
         */
        getImages: function () {
            return Ext.ComponentQuery.query('image', this.getView());
        },

        /**
         * @private
         * @return {Ext.Template} Шаблон.
         */
        getSrcTpl: function () {
            var tplString = 
                'http://res.cloudinary.com/hycanb7c0/image/upload/q_60,c_pad,w_{width},h_{height}/{name}.jpg';

            return new Ext.Template(tplString);
        },

        /**
         * @private
         * @param {Number} index Индекс картинки.
         * @return {String} Имя картинки.
         */
        getImageName: function (index) {
            var id = this.getViewModel().get('_id');

            return id + '_' + (index + 1);
        },

        /**
         * @private
         * @return {Number} Ширина.
         */
        getWidth: function () {
            return Ext.Viewport.getWindowWidth();
        },

        /**
         * @private
         * @return {Number} Высота.
         */
        getHeight: function () {
            var offset = 116;

            if (A.getCmp('mobileMenuToolbar').isHidden()) {
                offset = 154;
            }

            return Ext.Viewport.getWindowHeight() - offset;
        }
    }
});
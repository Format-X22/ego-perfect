/**
 * Виджет галереи.
 */
Ext.define('A.view.public.company.Gallery', {
    extend: 'Ext.Component',
    xtype: 'companyGallery',

    statics: {

        /**
         * @property {Number} galleryId Инкрементное ID галереи.
         */
        galleryId: 0
    },

    config: {

        /**
         * @cfg {PhotoSwipe} galleryObject Объект галереи.
         */
        galleryObject: null
    },

    style: {
        backgroundColor: 'black'
    },

    tpl:
        '<div class="pswp-{galleryId}" role="dialog" aria-hidden="true">' +
            '<div class="pswp__bg"></div>' +
            '<div class="pswp__scroll-wrap">' +
                '<div class="pswp__container">' +
                    '<div class="pswp__item"></div>' +
                    '<div class="pswp__item"></div>' +
                    '<div class="pswp__item"></div>' +
                '</div>' +
                '<div class="pswp__ui pswp__ui--hidden">' +
                    '<div class="pswp__top-bar">' +
                        '<div class="pswp__counter"></div>' +
                        '<div class="pswp__caption">' +
                            '<div class="pswp__caption__center"></div>' +
                        '</div>' +
                        '<button class="pswp__button pswp__button--fs"></button>' +
                        '<button class="pswp__button pswp__button--zoom"></button>' +
                        '<div class="pswp__preloader">' +
                            '<div class="pswp__preloader__icn">' +
                                '<div class="pswp__preloader__cut">' +
                                    '<div class="pswp__preloader__donut"></div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<button class="pswp__button pswp__button--arrow--left"></button>' +
                    '<button class="pswp__button pswp__button--arrow--right"></button>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<link rel="stylesheet" href="/resources/gallery/photoswipe.css">' +
        '<link rel="stylesheet" href="/resources/gallery/default-skin/default-skin.css">',

    data: null,

    /**
     * @inheritdoc
     */
    initComponent: function () {
        this.initialize();
    },

    /**
     * @inheritdoc
     */
    initialize: function () {
        var galleryId = A.view.public.company.Gallery.galleryId++;

        this.setData({
            galleryId: galleryId
        });

        this.on('show', function () {
            var items = [
                {
                    src: '/resources/gallery/tmp/1.JPG',
                    title: 'Некоторое описание фото',
                    w: 1224,
                    h: 1632
                },
                {
                    src: '/resources/gallery/tmp/2.JPG',
                    title: 'Некоторое описание фото',
                    w: 1224,
                    h: 1632
                },
                {
                    src: '/resources/gallery/tmp/3.JPG',
                    title: 'Некоторое описание фото',
                    w: 1224,
                    h: 1632
                },
                {
                    src: '/resources/gallery/tmp/4.JPG',
                    title: 'Некоторое описание фото',
                    w: 1224,
                    h: 1632
                },
                {
                    src: '/resources/gallery/tmp/5.JPG',
                    title: 'Некоторое описание фото',
                    w: 1224,
                    h: 1632
                },
                {
                    src: '/resources/gallery/tmp/6.JPG',
                    title: 'Некоторое описание фото',
                    w: 1224,
                    h: 1632
                },
                {
                    src: '/resources/gallery/tmp/7.JPG',
                    title: 'Некоторое описание фото',
                    w: 1224,
                    h: 1632
                },
                {
                    src: '/resources/gallery/tmp/8.JPG',
                    title: 'Некоторое описание фото',
                    w: 1224,
                    h: 1632
                }
            ];

            var galleryEl = document.querySelectorAll('.pswp-' + galleryId)[0];
            var gallery = new PhotoSwipe(
                galleryEl,
                PhotoSwipeUI_Default,
                items,
                {
                    index: 0,
                    pinchToClose: false,
                    closeOnScroll: false,
                    closeOnVerticalDrag: false,
                    escKey: false,
                    history: false,
                    modal: false,
                    preload: [3, 3]
                }
            );

            gallery.init();

            this.setGalleryObject(gallery);
            this.refreshGalleryLayout();
            this.makeOnShowRefresher();
        }, this, {single: true});
    },

    /**
     * Обновляет лейаут галереи.
     */
    refreshGalleryLayout: function () {
        var gallery = this.getGalleryObject();

        if (gallery) {
            Ext.defer(function () {
                gallery.invalidateCurrItems();
                gallery.updateSize(true);
                gallery.goTo(0);
            }, 1);
        }
    },

    privates: {

        /**
         * @private
         */
        makeOnShowRefresher: function () {
            this.on('show', function () {
                this.refreshGalleryLayout();

                Ext.defer(this.refreshGalleryLayout, 100, this);
            }, this);
        }
    }
});
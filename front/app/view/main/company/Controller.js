/**
 * Контроллер деталей компании.
 */
Ext.define('A.view.main.company.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.companyContainer',

    control: {
        'companyContainer': {
            'companyLoaded': 'refreshNotBindData'
        },
        'companyContainer [companyDetailsTabPanel=true]': {
            'tabchange': 'updateTabLink',
            'activeitemchange': 'updateTabLink'
        },
        'companyContainer #reviews tabpanel': {
            'tabchange': 'updateReviewsTabLink',
            'activeitemchange': 'updateReviewsTabLink'
        }
    },

    /**
     * Обновляет те данные, что не обновляются автоматически через биндинг.
     */
    refreshNotBindData: function () {
        this.refreshReviews();
        this.refreshGallery();
    },

    /**
     * Обновляет данные списка отзывов.
     */
    refreshReviews: function () {
        var list = this.getView().down('#reviewsList');
        var store = this.getViewModel().get('reviews');

        list.setStore(store);
    },

    /**
     * Принудительно перезагружает галерею фото.
     */
    refreshGallery: function () {
        var galleries = A.getAllCmp('companyGallery', this.getView());
        
        Ext.each(galleries, function (gallery) {
            gallery.getController().refresh();
        }, this);
    },

    /**
     * Обновляет ссылку для вкладки.
     * @param {Ext.tab.Panel} panel Панель вкладок.
     * @param {Ext.container.Container/Ext.Container} tab Вкладка.
     */
    updateTabLink: function (panel, tab) {
        var id = tab.getItemId();
        var subPath = A.Router.getCurrentSubPath();
        var base = subPath.split('_')[0];

        if (id === base) {
            return;
        }

        A.Router.changeSubPathTo(id);
    },

    /**
     * Обновляет ссылку для вкладок вкладки отзывов.
     * @param {Ext.tab.Panel} panel Панель вкладок.
     * @param {Ext.container.Container/Ext.Container} tab Вкладка.
     */
    updateReviewsTabLink: function (panel, tab) {
        var id = tab.getItemId();
        var subPath = A.Router.getCurrentSubPath();
        var end = subPath.split('_')[1];

        if (id === end) {
            return;
        }
        
        A.Router.changeSubPathTo('reviews_' + tab.getItemId());
    }
});
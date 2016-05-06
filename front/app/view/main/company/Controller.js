/**
 * Контроллер деталей компании.
 */
Ext.define('A.view.main.company.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.companyContainer',

    control: {
        'companyContainer': {
            'companyLoaded': 'refreshGallery'
        }
    },

    /**
     * Принудительно перезагружает галерею фото.
     */
    refreshGallery: function () {
        var galleries = A.getAllCmp('companyGallery', this.getView());
        
        Ext.each(galleries, function (gallery) {
            gallery.getController().refresh();
        }, this);
    }
});
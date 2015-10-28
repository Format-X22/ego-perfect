Ext.define('A.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    showMobileMenu: function () {
        Ext.Viewport.toggleMenu('right');
    }
});

Ext.define('A.view.main.MobileMenuToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mobileMenuToolbar',

    showMobileMenu: function () {
        Ext.Viewport.toggleMenu('right');
    }
});
Ext.define('A.view.main.MobileMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mobileMenu',

    goToPage: function (pageNum) {
        Ext.ComponentQuery.query('app-main mainTabPanel')[0].setActiveItem(pageNum);
        Ext.Viewport.toggleMenu('right');
    }
});
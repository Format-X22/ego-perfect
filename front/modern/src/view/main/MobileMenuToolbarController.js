/**
 * Контроллер тулбара с меню для телефонов.
 */
Ext.define('A.view.main.MobileMenuToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mobileMenuToolbar',

    /**
     * Показывает выдвигающееся меню для телефонов.
     */
    showMobileMenu: function () {
        Ext.Viewport.toggleMenu('right');
    },

    backToSearch: function (button) {
        Ext.ComponentQuery.query('searchResult')[0].getController().backToSearch();
        button.hide();
    }
});
/**
 * Контроллер выдвигающегося меню для телефонов.
 */
Ext.define('A.view.main.MobileMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mobileMenu',

    /**
     * Переключение на указанную страницу, инициированное мобильным меню.
     * @param {Number} pageNum Номер страницы.
     */
    goToPage: function (pageNum) {
        Ext.ComponentQuery.query('app-main mainTabPanel')[0].setActiveItem(pageNum);
        Ext.Viewport.toggleMenu('right');
    }
});
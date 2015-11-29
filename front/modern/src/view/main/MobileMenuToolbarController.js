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

    /**
     * Возвращает к результатам поиска,
     * делегирую действие контроллеру поиска.
     * @param {Ext.Button} button Кнопка.
     */
    backToSearch: function (button) {
        Ext.ComponentQuery.query('searchResult')[0].getController().backToSearch();
        button.hide();
    }
});
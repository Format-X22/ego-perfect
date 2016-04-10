/**
 * Контроллер главного виджета публичной части приложения для ПК.
 */
Ext.define('A.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.appMainPublic',

    /**
     * Устанавливает хеш страницы.
     * @param {Ext.tab.Panel} panel Панель вкладок.
     * @param {Ext.Component} tab Вкладка.
     */
    updatePageHash: function (panel, tab) {
        this.redirectTo('rootPage/' + tab.itemId);
    }
});

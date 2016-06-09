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
        var id = tab.getItemId();
        var currentPageIsCompany = ~A.Router.getCurrentPath().indexOf('company-');
        
        if (currentPageIsCompany && (id === 'search')) {
            return;
        }
        
        A.Router.changePathTo('root-' + tab.itemId);
    }
});

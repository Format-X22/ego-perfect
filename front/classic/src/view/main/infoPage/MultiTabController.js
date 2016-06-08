/**
 * Виджет с текстом договора для партнера.
 */
Ext.define('A.view.main.infoPage.MultiTabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.infoPageMultiTab',

    /**
     * Обновляет ссылку для вкладки.
     * @param {Ext.tab.Panel} panel Панель вкладок.
     * @param {Ext.container.Container} tab Вкладка.
     */
    updateTabLink: function (panel, tab) {
        A.Router.changeSubPathTo(tab.getItemId());
    }
});
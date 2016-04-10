/**
 * Контроллер главной панели вкладок.
 */
Ext.define('A.view.main.MainTabPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainTabPanel',

    control: {
        'mainTabPanel': {
            activeitemchange: 'updateMobileTitle'
        }
    },

    /**
     * Обновляем титл мобильного тулбара,
     * на котором указывается текущая страница.
     * @param {Ext.tab.Panel} tabPanel Выбранная вкладка.
     */
    updateMobileTitle: function (tabPanel) {
        var toolbar = A.getCmp('appMainPublic mobileMenuToolbar');
        var title = tabPanel.getActiveItem().title;

        toolbar.getViewModel().set('currentPageName', title);
    },

    /**
     * Устанавливает хеш страницы.
     * @param {Ext.tab.Panel} panel Панель вкладок.
     * @param {Ext.Component} tab Вкладка.
     */
    updatePageHash: function (panel, tab) {
        this.redirectTo('rootPage/' + tab.getItemId());
    }
});
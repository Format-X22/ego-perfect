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
     * Добавляет номер телефона техподдержки в верхний тулбар.
     */
    addPhone: function () {
        var tabBar = this.getView().getTabBar();

        if (tabBar.down('#phone')) {
            return;
        }
        
        tabBar.add({
            flex: 1
        });
        
        tabBar.add(
            {
                itemId: 'phone',
                xtype: 'component',
                padding: '0 25',
                style: {
                    color: 'white'
                },
                html: '<a class="link link-white" href="tel:88002500186">8 (800) 25-00-186</a> | круглосуточно'
            }
        );
    },

    /**
     * Обновляем титл мобильного тулбара,
     * на котором указывается текущая страница.
     * @param {Ext.tab.Panel} tabPanel Выбранная вкладка.
     */
    updateMobileTitle: function (tabPanel) {
        var toolbar = A.getCmp('appMainPublic mobileMenuToolbar');
        var active = tabPanel.getActiveItem();
        var title = active.title || active.getTitle();
        
        toolbar.getViewModel().set('currentPageName', title);
    },

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
        
        A.Router.changePathTo('root-' + tab.getItemId());
    }
});
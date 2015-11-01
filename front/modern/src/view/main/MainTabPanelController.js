Ext.define('A.view.main.MainTabPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainTabPanel',

    control: {
        'mainTabPanel': {
            activeitemchange: 'updateMobileTitle'
        }
    },

    updateMobileTitle: function (tabPanel) {
        var toolbar = Ext.ComponentQuery.query('app-main mobileMenuToolbar')[0];
        var title = tabPanel.getActiveItem().title;

        toolbar.getViewModel().set('currentPageName', title);
    }
});
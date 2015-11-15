/**
 * Единый контроллер всех виджетов поиска.
 * Един по причине полной схожести действий для мобильных и планшетных устройств.
 */
Ext.define('A.view.main.search.AllSearchController', {
    extend: 'A.view.main.company.AbstractAllSearchController',
    alias: 'controller.allSearchController',

    toggleInitView: function () {
        this.getMobileSearch().hide();
        this.getTabletSearch().hide();
        this.getSearchResult().show();
    },

    getMobileSearch: function () {
        return this.getCmp('startMobileSearch');
    },

    getTabletSearch: function () {
        return this.getCmp('startTabletSearch');
    },

    getSearchResult: function () {
        return this.getCmp('searchResult');
    }
});
/**
 * Единый контроллер всех виджетов поиска.
 * Един по причине полной схожести действий для мобильных и планшетных устройств.
 */
Ext.define('A.view.main.search.AllSearchController', {
    extend: 'A.view.main.company.AbstractAllSearchController',
    alias: 'controller.allSearch',

    toggleInitView: function () {
        this.getMobileSearch().hide();
        this.getTabletSearch().hide();
        this.getSearchResult().show();
    },

    /**
     *
     */
    switchTabletInitToSimple: function () {
        this.getView().down('startTabletSearch #img').hide();
        this.getView().down('startTabletSearch #description').hide();
    },

    /**
     *
     */
    switchTabletInitToFull: function () {
        this.getView().down('startTabletSearch #img').show();
        this.getView().down('startTabletSearch #description').show();
    },

    /**
     *
     * @returns {*}
     */
    getMobileSearch: function () {
        return this.getCmp('startMobileSearch');
    },

    /**
     *
     * @returns {*}
     */
    getTabletSearch: function () {
        return this.getCmp('startTabletSearch');
    },

    /**
     *
     * @returns {*}
     */
    getSearchResult: function () {
        return this.getCmp('searchResult');
    }
});
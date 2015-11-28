/**
 *
 */
Ext.define('A.view.main.search.SearchResultController', {
    extend: 'A.view.main.company.AbstractSearchResultController',
    alias: 'controller.searchResult',

    showCompany: function () {
        this.callParent(arguments);
        this.showMobileBackButton();
    },

    backToSearch: function () {
        this.callParent(arguments);
        this.hideMobileBackButton();
    },

    /**
     *
     */
    showMobileBackButton: function () {
        this.getMobileBackButton().show();
    },

    /**
     *
     */
    hideMobileBackButton: function () {
        this.getMobileBackButton().hide();
    },

    /**
     *
     * @returns {*}
     */
    getMobileBackButton: function () {
        return Ext.ComponentQuery.query('#backToSearchMobile')[0];
    }
});
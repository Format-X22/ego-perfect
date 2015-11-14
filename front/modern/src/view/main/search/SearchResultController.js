Ext.define('A.view.main.search.SearchResultController', {
    extend: 'A.view.main.company.AbstractSearchResultController',
    alias: 'controller.searchResultController',

    control: {
        'companyContainer #backToSearch': {
            tap: 'backToSearch'
        }
    },

    showCompany: function () {
        this.hideSearch();
        this.switchToCompany();
    },

    backToSearch: function () {
        this.showSearch();
        this.switchToSearch();
    },

    showSearch: function () {
        this.getSearchToolbar().show('fade');
    },

    hideSearch: function () {
        this.getSearchToolbar().hide('fadeOut');
    },

    switchToCompany: function () {
        this.getResultCard().setActiveItem(1);
    },

    switchToSearch: function () {
        this.getResultCard().setActiveItem(0);
    },

    getSearchToolbar: function () {
        return this.getView().down('#searchToolbar');
    },

    getResultCard: function () {
        return this.getView().down('#resultCard');
    }
});
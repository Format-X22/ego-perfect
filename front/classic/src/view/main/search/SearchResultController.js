Ext.define('A.view.main.search.SearchResultController', {
    extend: 'A.view.main.company.AbstractSearchResultController',
    alias: 'controller.searchResultController',

    showCompany: function () {
        this.getView().down('#resultCard').setActiveItem(1);
    }
});
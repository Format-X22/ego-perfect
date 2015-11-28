/**
 *
 */
Ext.define('A.view.main.search.SearchResultController', {
    extend: 'A.view.main.company.AbstractSearchResultController',
    alias: 'controller.searchResult',

    /**
     *
     */
    focusSearchInput: function (component) {
        component.down('#searchInput').focus();
    }
});
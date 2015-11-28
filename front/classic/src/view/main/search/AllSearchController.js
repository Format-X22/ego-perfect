/**
 *
 */
Ext.define('A.view.main.search.AllSearchController', {
    extend: 'A.view.main.company.AbstractAllSearchController',
    alias: 'controller.allSearch',

    toggleInitView: function () {
        Ext.ComponentQuery.query('startDesktopSearch')[0].hide();
        Ext.ComponentQuery.query('searchResult')[0].show();
    },

    /**
     *
     */
    focusSearchInput: function (component) {
        if (component.getItemId() === 'searchInput') {
            component.focus();
        } else {
            component.down('#searchInput').focus();
        }
    }
});
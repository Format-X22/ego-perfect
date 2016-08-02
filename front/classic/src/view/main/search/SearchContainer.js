/**
 * Контейнер вкладки поиска.
 */
Ext.define('A.view.main.search.SearchContainer', {
    extend: 'Ext.Container',
    xtype: 'searchContainer',
    controller: 'allSearch',

    requires: [
        'A.view.main.search.StartDesktopSearch',
        'A.view.main.search.SearchResult',
        'A.view.main.search.AllSearchController',
        'A.view.main.search.HelpWindow'
    ],

    layout: 'fit',
    cls: 'grey-back',

    items: [
        {
            xtype: 'startDesktopSearch'
        },
        {
            itemId: 'searchResult',
            xtype: 'searchResult',
            hidden: true
        }
    ],

    listeners: {
        activate: 'focusSearchInput'
    }
});
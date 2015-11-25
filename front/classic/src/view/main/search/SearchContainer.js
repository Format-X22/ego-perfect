/**
 *
 */
Ext.define('A.view.main.search.SearchContainer', {
    extend: 'Ext.Container',
    xtype: 'searchContainer',
    controller: 'allSearchController',

    requires: [
        'A.view.main.search.StartDesktopSearch',
        'A.view.main.search.SearchResult',
        'A.view.main.search.AllSearchController'
    ],

    layout: 'fit',

    items: [
        {
            xtype: 'startDesktopSearch'
        },
        {
            xtype: 'searchResult',
            hidden: true
        }
    ]
});
/**
 * Контейнер вкладки поиска.
 */
Ext.define('A.view.public.search.SearchContainer', {
    extend: 'Ext.Container',
    xtype: 'searchContainer',
    controller: 'allSearch',

    requires: [
        'A.view.public.search.StartDesktopSearch',
        'A.view.public.search.SearchResult',
        'A.view.public.search.AllSearchController',
        'A.view.public.search.HelpWindow'
    ],

    layout: 'fit',

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
/**
 * Контейнер, содержащий все вью поиска.
 */
Ext.define('A.view.public.search.SearchContainer', {
    extend: 'Ext.Container',
    xtype: 'searchContainer',
    controller: 'allSearch',

    requires: [
        'Ext.plugin.Responsive',
        'A.view.public.search.StartMobileSearch',
        'A.view.public.search.StartTabletSearch',
        'A.view.public.search.SearchResult',
        'A.view.public.search.AllSearchController',
        'A.view.public.search.HelpWindow'
    ],

    items: [
        {
            xtype: 'startMobileSearch',
            plugins: 'responsive',
            responsiveFormulas: {
                isInitSearch: function () {
                    var searchResult = Ext.ComponentQuery.query('searchResult')[0];

                    if (searchResult) {
                        return searchResult.isHidden();
                    }
                    return true;
                }
            },
            responsiveConfig: {
                '(width < 600 || height < 400) && isInitSearch': {
                    hidden: false
                },
                'width >= 600 && height >= 400': {
                    hidden: true
                }
            }
        },
        {
            xtype: 'startTabletSearch',
            plugins: 'responsive',
            responsiveConfig: {
                'width < 600 || height < 400': {
                    hidden: true
                },
                'width >= 600 && height >= 400 && isInitSearch': {
                    hidden: false
                }
            }
        },
        {
            itemId: 'searchResult',
            xtype: 'searchResult',
            hidden: true
        }
    ]
});
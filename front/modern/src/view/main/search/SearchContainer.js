/**
 * Контейнер, содержащий все вью поиска.
 */
Ext.define('A.view.main.search.SearchContainer', {
    extend: 'Ext.Container',
    xtype: 'searchContainer',
    controller: 'allSearchController',

    requires: [
        'Ext.plugin.Responsive',
        'A.view.main.search.StartMobileSearch',
        'A.view.main.search.StartTabletSearch',
        'A.view.main.search.SearchResult',
        'A.view.main.search.AllSearchController'
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
            xtype: 'searchResult',
            hidden: true
        }
    ]
});
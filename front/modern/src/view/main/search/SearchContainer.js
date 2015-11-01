Ext.define('A.view.main.search.SearchContainer', {
    extend: 'Ext.Container',
    xtype: 'searchContainer',
    controller: 'allSearchController',

    requires: [
        'A.view.main.search.StartMobileSearch',
        'A.view.main.search.StartTabletSearch',
        'A.view.main.search.SearchResult',
        'A.view.main.search.AllSearchController'
    ],

    padding: 10,

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
                'width < 600 && isInitSearch': {
                    hidden: false
                },
                'width >= 600': {
                    hidden: true
                }
            }
        },
        {
            xtype: 'startTabletSearch',
            plugins: 'responsive',
            responsiveConfig: {
                'width < 600': {
                    hidden: true
                },
                'width >= 600 && isInitSearch': {
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
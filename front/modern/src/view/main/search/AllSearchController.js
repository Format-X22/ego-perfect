Ext.define('A.view.main.search.AllSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.allSearchController',

    control: {
        '#searchInput': {
            change: 'syncAllSearchInputs'
        },
        '#searchButton': {
            tap: 'search'
        }
    },

    syncAllSearchInputs: function (originInput, value) {
        var inputs = Ext.ComponentQuery.query('#searchInput');

        Ext.Array.each(inputs, function (input) {
            input.setValue(value);
        });
    },

    search: function () {
        Ext.ComponentQuery.query('startMobileSearch')[0].hide();
        Ext.ComponentQuery.query('startTabletSearch')[0].hide();
        Ext.ComponentQuery.query('searchResult')[0].show();
    }
});
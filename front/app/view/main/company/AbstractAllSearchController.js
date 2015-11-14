Ext.define('A.view.main.company.AbstractAllSearchController', {
    extend: 'Ext.app.ViewController',

    requires: [
         'A.store.Search'
    ],

    control: {
        '#searchInput': {
            change: 'syncAllSearchInputs'
        },
        '#searchButton': {
            tap: 'search',
            click: 'search'
        }
    },

    syncAllSearchInputs: function (originInput, value) {
        var inputs = this.getSearchInputs();

        Ext.Array.each(inputs, function (input) {
            input.setValue(value);
        });
    },

    getSearchInputs: function () {
        return Ext.ComponentQuery.query('#searchInput');
    },

    search: function () {
        this.toggleInitView();
        this.sendQuery();
    },

    toggleInitView: Ext.emptyFn,

    sendQuery: function () {
        var value = this.getSearchInputs()[0].getValue();

        /*A.store.Search.load({
            params: {
                query: value || ''
            }
        });*/
    },

    getCmp: function (selector) {
        return Ext.ComponentQuery.query(selector)[0];
    }
});
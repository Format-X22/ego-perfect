Ext.define('A.view.main.company.AbstractSearchResultController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'A.store.Company'
    ],

    control: {
        '#searchResult': {
            itemclick: 'openCompanyFromClassic',
            itemtap: 'openCompanyFromModern'
        }
    },

    openCompanyFromClassic: function (view, record) {
        this.openCompany(view, record);
    },

    openCompanyFromModern: function (view, index, target, record) {
        this.openCompany(view, record);
    },

    openCompany: function (view, record) {
        this.loadCompany(record);
        this.showCompany(view);
    },

    loadCompany: function (record) {
        /*A.store.Company.load({
            params: {
                id: record.get('id')
            }
        });*/
    },

    showCompany: Ext.emptyFn
});
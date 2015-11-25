Ext.define('A.view.main.company.AbstractSearchResultController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'A.store.Company'
    ],

    control: {
        '#searchResult': {
            itemclick: 'openCompanyFromClassic',
            itemtap: 'openCompanyFromModern'
        },
        'companyContainer #backToSearch': {
            tap: 'backToSearch',
            click: 'backToSearch'
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

    showCompany: function () {
        this.hideSearch();
        this.switchToCompany();
    },

    backToSearch: function () {
        this.showSearch();
        this.switchToSearch();
    },

    showSearch: function () {
        this.getSearchToolbar().show();
    },

    hideSearch: function () {
        this.getSearchToolbar().hide();
    },

    switchToCompany: function () {
        this.getResultCard().setActiveItem(1);
    },

    switchToSearch: function () {
        this.getResultCard().setActiveItem(0);
    },

    getSearchToolbar: function () {
        return this.getView().down('#searchToolbar');
    },

    getResultCard: function () {
        return this.getView().down('#resultCard');
    }
});
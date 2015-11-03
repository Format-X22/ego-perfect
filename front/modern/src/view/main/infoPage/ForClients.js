Ext.define('A.view.main.infoPage.ForClients', {
    extend: 'A.view.main.infoPage.AbstractPage',
    xtype: 'pageForClients',
    store: 'pageForClients',

    requires: [
        'A.store.PageForClients'
    ]
});
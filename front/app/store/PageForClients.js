Ext.define('A.store.PageForClients', {
    extend: 'Ext.data.Store',
    singleton: true,
    storeId: 'pageForClients',

    fields: ['todo'],

    proxy: {
        type: 'memory'
    },

    data: [
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
    ]
});
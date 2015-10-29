Ext.define('A.store.SearchStore', {
    extend: 'Ext.data.Store',
    singleton: true,
    storeId: 'searchStore',

    fields: ['todo'],

    proxy: {
        type: 'memory'
    },

    data: [
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
    ]
});
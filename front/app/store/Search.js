/**
 * Стор поиска компаний.
 */
Ext.define('A.store.Search', {
    extend: 'Ext.data.Store',
    singleton: true,
    storeId: 'search',

    fields: ['todo'],

    proxy: {
        type: 'memory'
    },

    data: [
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
    ]
});
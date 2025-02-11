/**
 * Стор поиска компаний.
 */
Ext.define('A.store.Search', {
    extend: 'Ext.data.Store',
    singleton: true,
    storeId: 'search',

    model: 'A.model.Search',

    proxy: {
        type: 'ajax',
        url: '/api/search/',
        reader: 'standard'
    }
});
/**
 * Стор с детальным описанием компании.
 */
Ext.define('A.store.Company', {
    extend: 'Ext.data.Store',
    singleton: true,
    storeId: 'company',

    fields: ['todo'],

    proxy: {
        type: 'memory'
    },

    data: [
        {}
    ]
});
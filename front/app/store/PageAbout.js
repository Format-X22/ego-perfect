/**
 * Стор страницы о нас.
 */
Ext.define('A.store.PageAbout', {
    extend: 'Ext.data.Store',
    singleton: true,
    storeId: 'pageAbout',

    fields: ['todo'],

    proxy: {
        type: 'memory'
    },

    data: [
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
    ]
});
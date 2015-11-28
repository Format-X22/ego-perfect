/**
 * Стор страницы для партнеров.
 */
Ext.define('A.store.PageForPartners', {
    extend: 'Ext.data.Store',
    singleton: true,
    storeId: 'pageForPartners',

    model: 'A.model.InfoPage',

    proxy: {
        type: 'memory'
    },

    data: [
        {
            id: 1,
            header: 'text',
            description: 'anotherText'
        },
        {
            id: 2,
            header: 'text',
            description: 'anotherText'
        },
        {
            id: 3,
            header: 'text',
            description: 'anotherText'
        },
        {
            id: 4,
            header: 'text',
            description: 'anotherText'
        },
        {
            id: 5,
            header: 'text',
            description: 'anotherText'
        },
        {
            id: 6,
            header: 'text',
            description: 'anotherText'
        }
    ]
});
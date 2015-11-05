/**
 * Стор страницы для клиентов.
 */
Ext.define('A.store.PageForClients', {
    extend: 'Ext.data.Store',
    singleton: true,
    storeId: 'pageForClients',

    model: 'A.model.InfoPage',

    proxy: {
        type: 'memory'
    },

    data: [
        {id: 1, header: 'text', description: 'anotherText'},
        {id: 2, header: 'text', description: 'anotherText'},
        {id: 3, header: 'text', description: 'anotherText'},
        {id: 4, header: 'text', description: 'anotherText'},
        {id: 5, header: 'text', description: 'anotherText'},
        {id: 6, header: 'text', description: 'anotherText'},
        {id: 7, header: 'text', description: 'anotherText'},
        {id: 8, header: 'text', description: 'anotherText'},
        {id: 9, header: 'text', description: 'anotherText'},
        {id: 10, header: 'text', description: 'anotherText'},
        {id: 11, header: 'text', description: 'anotherText'},
        {id: 12, header: 'text', description: 'anotherText'},
        {id: 13, header: 'text', description: 'anotherText'},
        {id: 14, header: 'text', description: 'anotherText'},
        {id: 15, header: 'text', description: 'anotherText'},
        {id: 16, header: 'text', description: 'anotherText'},
        {id: 17, header: 'text', description: 'anotherText'},
        {id: 18, header: 'text', description: 'anotherText'},
        {id: 19, header: 'text', description: 'anotherText'},
        {id: 20, header: 'text', description: 'anotherText'}
    ]
});
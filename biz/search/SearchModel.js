/**
 * Модель параметров поиска.
 */
Ext.define('B.biz.search.SearchModel', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'query',
            type: 'string',
            validators: {
                type: 'length',
                max: 300
            }
        },
        {
            name: 'start',
            type: 'int',
            validators: {
                type: 'range',
                min: 0,
                max: 100 * 1000
            }
        },
        {
            name: 'limit',
            type: 'int',
            validators: {
                type: 'range',
                min: 1,
                max: 100
            }
        }
    ]
});
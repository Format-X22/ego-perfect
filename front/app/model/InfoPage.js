/**
 * Модель страниц с информацией.
 */
Ext.define('A.model.InfoPage', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id',          type: 'int'   },
        {name: 'url',         type: 'string'},
        {name: 'header',      type: 'string'},
        {name: 'description', type: 'string'}
    ]
});
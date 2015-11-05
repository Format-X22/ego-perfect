/**
 * Модель страниц с информацией.
 */
Ext.define('A.model.InfoPage', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id',          type: 'int'   },
        {name: 'header',      type: 'string'},
        {name: 'description', type: 'string'}
    ]
});
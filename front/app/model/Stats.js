/**
 * Модель статистики.
 */
Ext.define('A.model.Stats', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'date',  type: 'string'},
        {name: 'value', type: 'float' }
    ]
});
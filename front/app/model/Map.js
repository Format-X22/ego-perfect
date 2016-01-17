/**
 * Модель данных для карты.
 */
Ext.define('A.model.Map', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'lat', type: 'float'},
        {name: 'lng', type: 'float'}
    ]
});
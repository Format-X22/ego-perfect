/**
 * Модель данных отзыва.
 */
Ext.define('A.model.Review', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'rating',      type: 'int'                      },
        {name: 'name',        type: 'safeString'               },
        {name: 'header',      type: 'safeString'               },
        {name: 'description', type: 'safeString'               },
        {name: 'date',        type: 'date', dateFormat: 'd.m.Y'}
    ]
});
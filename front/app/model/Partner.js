/**
 * Модель данных патнера.
 */
Ext.define('A.model.Partner', {
    extend: 'Ext.data.Model',

    requires: [
        'A.model.field.Store',
        'A.model.Stats',
        'A.store.reader.Standard'
    ],

    fields: [
        {name: 'id',    type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'key',   type: 'string'},
        {name: 'stats', type: 'store', model: 'A.model.Stats'}
    ],

    proxy: {
        type: 'rest',
        url: '/api/partners',
        appendId: true,
        reader: 'standard'
    }
});
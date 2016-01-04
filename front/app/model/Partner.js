/**
 * Модель данных патнера.
 */
Ext.define('A.model.Partner', {
    extend: 'Ext.data.Model',

    requires: [
        'A.model.field.Store',
        'A.model.Stats',
        'A.model.PartnerTotalStats',
        'A.store.reader.Standard'
    ],

    fields: [
        {name: 'id',    type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'key',   type: 'string'},
        {name: 'totalStats',    type: 'store', model: 'A.model.PartnerTotalStats'},
        {name: 'clientsStats',  type: 'store', model: 'A.model.Stats'},
        {name: 'partnersStats', type: 'store', model: 'A.model.Stats'},
        {name: 'incomeStats',   type: 'store', model: 'A.model.Stats'}
    ],

    proxy: {
        type: 'rest',
        url: '/api/partners',
        appendId: true,
        reader: 'standard'
    }
});
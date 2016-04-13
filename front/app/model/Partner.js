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
        {name: '_id',   type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'totalStat',    type: 'store', model: 'A.model.PartnerTotalStats'},
        {name: 'clientsStat',  type: 'store', model: 'A.model.Stats'},
        {name: 'partnersStat', type: 'store', model: 'A.model.Stats'},
        {name: 'moneyStat',    type: 'store', model: 'A.model.Stats'}
    ],

    proxy: {
        type: 'ajax',
        url: '/api/partner',
        reader: 'standard'
    }
});
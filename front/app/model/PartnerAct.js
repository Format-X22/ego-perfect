/**
 * Модель данных актов партнера.
 */
Ext.define('A.model.PartnerAct', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'name',    type: 'string' },
        {name: 'login',   type: 'string' },
        {name: 'count',   type: 'number' },
        {name: 'date',    type: 'date', format: 'd.m.Y H:i:s'},
        {name: 'percent', type: 'number' },
        {name: 'done',    type: 'boolean'}
    ]
});
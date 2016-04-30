/**
 * Модель подробных данных компании.
 */
Ext.define('A.model.Company', {
    extend: 'Ext.data.Model',

    requires: [
        'A.model.field.Store',
        'A.model.field.SafeString',
        'A.model.Review',
        'A.model.Map'
    ],

    fields: [
        {name: '_id',          type: 'safeString'},
        {name: 'search_id',    type: 'safeString'},
        {name: 'name',         type: 'safeString'},
        {name: 'rating',       type: 'int'       },
        {name: 'phone',        type: 'safeString'},
        {name: 'mail',         type: 'safeString'},
        {name: 'time',         type: 'safeString'},
        {name: 'address',      type: 'safeString'},
        {name: 'summary',      type: 'string'},

        {name: 'reviews',      type: 'store',  model: 'A.model.Review', reverseData: true },
        {name: 'map',          type: 'store',  model: 'A.model.Map'                       },

        {
            name: 'site',
            type: 'string',
            convert: function (value) {
                value = Ext.String.htmlEncode(value);
                
                if (value) {
                    return String(value).trim();
                } else {
                    return value;
                }
            }
        }
    ],

    proxy: {
        type: 'ajax',
        url: '/api/company',
        reader: 'standard'
    }
});
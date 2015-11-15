/**
 * Модель подробных данных компании.
 */
Ext.define('A.model.Company', {
    extend: 'Ext.data.Model',

    requires: [
        'A.model.field.Store',
        'A.model.Gallery',
        'A.model.Review',
        'A.model.Map'
    ],

    fields: [
        {name: 'id',           type: 'int'                             },
        {name: 'name',         type: 'string'                          },
        {name: 'rating',       type: 'int'                             },
        {name: 'phone',        type: 'string', defaultValue: '-'       },
        {name: 'site',         type: 'string', defaultValue: '-'       },
        {name: 'mail',         type: 'string', defaultValue: '-'       },
        {name: 'time',         type: 'string', defaultValue: '-'       },
        {name: 'address',      type: 'string', defaultValue: '-'       },
        {name: 'socialHrefN1', type: 'string', defaultValue: '-'       },
        {name: 'socialHrefN2', type: 'string', defaultValue: '-'       },
        {name: 'socialHrefN3', type: 'string', defaultValue: '-'       },
        {name: 'socialHrefN4', type: 'string', defaultValue: '-'       },
        {name: 'summary',      type: 'string'                          },
        {name: 'gallery',      type: 'store',  model: 'A.model.Gallery'},
        {name: 'reviews',      type: 'store',  model: 'A.model.Review' },
        {name: 'map',          type: 'store',  model: 'A.model.Map'    }
    ]
});
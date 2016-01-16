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
        {name: '_id',          type: 'string'                          },
        {name: 'name',         type: 'string'                          },
        {name: 'rating',       type: 'int'                             },
        {name: 'phone',        type: 'string'                          },
        {name: 'site',         type: 'string'                          },
        {name: 'mail',         type: 'string'                          },
        {name: 'time',         type: 'string'                          },
        {name: 'address',      type: 'string'                          },
        {name: 'summary',      type: 'string'                          },
        {name: 'gallery',      type: 'store',  model: 'A.model.Gallery'},
        {name: 'reviews',      type: 'store',  model: 'A.model.Review' },
        {name: 'map',          type: 'store',  model: 'A.model.Map'    }
    ],

    proxy: {
        type: 'ajax',
        url: '/api/company',
        reader: 'standard'
    }
});
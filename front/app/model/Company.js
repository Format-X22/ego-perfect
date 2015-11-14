/**
 * Модель подробных данных компании.
 */
Ext.define('A.model.Company', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Field',
        'A.model.Gallery',
        'A.model.Review',
        'A.model.Map'
    ],

    fields: [
        {name: 'id',           type: 'int'   },
        {name: 'name',         type: 'string'},
        {name: 'rating',       type: 'int'   },
        {name: 'phone',        type: 'string'},
        {name: 'site',         type: 'string'},
        {name: 'mail',         type: 'string'},
        {name: 'time',         type: 'string'},
        {name: 'address',      type: 'string'},
        {name: 'socialHrefN1', type: 'string'},
        {name: 'socialHrefN2', type: 'string'},
        {name: 'socialHrefN3', type: 'string'},
        {name: 'socialHrefN4', type: 'string'},
        {name: 'socialIconN1', type: 'string'},
        {name: 'socialIconN2', type: 'string'},
        {name: 'socialIconN3', type: 'string'},
        {name: 'socialIconN4', type: 'string'},
        {name: 'summary',      type: 'string'},
        {name: 'gallery',      type: 'store', model: 'A.model.Gallery'},
        {name: 'reviews',      type: 'store', model: 'A.model.Review' },
        {name: 'map',          type: 'store', model: 'A.model.Map'    }
    ]
});
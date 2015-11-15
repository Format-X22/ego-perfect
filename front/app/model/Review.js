Ext.define('A.model.Review', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id',          type: 'int'   },
        {name: 'rating',      type: 'int'   },
        {name: 'name',        type: 'string'},
        {name: 'header',      type: 'string'},
        {name: 'description', type: 'string'}
    ]
});
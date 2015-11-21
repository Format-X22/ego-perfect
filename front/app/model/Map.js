Ext.define('A.model.Map', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id',  type: 'int'  },
        {name: 'lat', type: 'float'},
        {name: 'lng', type: 'float'}
    ]
});
Ext.define('A.model.Store', {
    extend: 'Ext.data.field.Field',
    alias: 'data.field.store',

    requires: [
        'A.store.FieldStore'
    ],

    getType: function () {
        return 'store';
    },

    convert: function (value) {
        return Ext.create('A.store.FieldStore', {
            model: this.model,
            data: value || [],
            parentStore: this.store
        });
    }
});
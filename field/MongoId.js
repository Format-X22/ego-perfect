/**
 * Поле для данных вида Mongo ObjectID.
 * Содержит валидацию.
 */
Ext.define('B.field.MongoId', {
    extend: 'Ext.data.field.Field',
    alias: 'data.field.mongoId',

    convert: function (value) {
        if (!value) {
            return null;
        }

        try {
            return B.Mongo.makeId(value);
        } catch (error) {
            return null;
        }
    },

    validators: {
        type: 'presence'
    }
});
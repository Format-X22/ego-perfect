/**
 * Поле модели типа строки,
 * убирающая опасные символы из значения.
 */
Ext.define('A.model.field.SafeString', {
    extend: 'Ext.data.field.Field',
    alias: 'data.field.safeString',

    /**
     * @inheritdoc
     */
    convert: function (value) {
        return Ext.String.htmlEncode(value);
    }
});
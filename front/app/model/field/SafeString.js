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
    format: function (value) {
        return Ext.encode(value);
    }
});
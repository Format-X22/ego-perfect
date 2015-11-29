/**
 * Поле модели, являющееся стором.
 * Строит стор на основе входных данных.
 * Дополнительно необходимо указать модель,
 * которая будет использоваться в генерируемом сторе.
 * Генерируемый стор является инстансом {@link A.store.FieldStore}.
 */
Ext.define('A.model.field.Store', {
    extend: 'Ext.data.field.Field',
    alias: 'data.field.store',

    requires: [
        'A.store.FieldStore'
    ],

    /**
     * @cfg {String} model Имя модели для стора.
     */
    model: null,

    /**
     * @inheritdoc
     */
    getType: function () {
        return 'store';
    },

    /**
     * @inheritdoc
     */
    convert: function (value) {
        return Ext.create('A.store.FieldStore', {
            model: this.model,
            data: value || [],
            parentStore: this.store
        });
    }
});
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
     * @cfg {Boolean} reverseData
     * При включении этого флага массив входных данных переворачивается наоборот,
     * используя метод reverse для массивов.
     */
    reverseData: false,

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
        value = Ext.Array.from(value);

        if (this.reverseData) {
            value.reverse();
        }

        return Ext.create('A.store.FieldStore', {
            model: this.model,
            data: value,
            parentStore: this.store
        });
    }
});
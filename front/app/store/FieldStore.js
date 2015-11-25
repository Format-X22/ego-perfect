/**
 * Стор, который создается для данных поля типа store, смотри {@link A.model.field.Store}.
 */
Ext.define('A.store.FieldStore', {
    extend: 'Ext.data.Store',

    /**
     * @readonly
     * @property {Ext.data.Store} parentStore Стор модели, в которой находится это стор-поле.
     */
    parentStore: null
});
/**
 * Ридер со стандартным набором настроек
 * для типичной загрузки данных с сервера.
 */
Ext.define('A.store.reader.Standard', {
    extend: 'Ext.data.reader.Json',
    alias: 'reader.standard',

    rootProperty: 'data',
    successProperty: 'success',
    messageProperty: 'error'
});
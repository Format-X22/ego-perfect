/**
 * Утилита для работы с коллекцией поиска.
 * Является прослойкой над MongoDB драйвером,
 * все колбеки содержат оригинальные параметры.
 */
Ext.define('B.mongo.Search', {
    extend: 'B.mongo.AbstractBase',

    collectionName: 'search',
    
    /**
     * Удаление множества документов.
     */
    deleteMany: function () {
        this.getCollection().deleteMany(
            this.getValue(),
            this.getOptions(),
            this.getCallbackCaller()
        );
    }
});
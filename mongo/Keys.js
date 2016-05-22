/**
 * Утилита для работы со скидочными и прочими подобными ключами.
 * Является прослойкой над MongoDB драйвером,
 * все колбеки содержат оригинальные параметры.
 */
Ext.define('B.mongo.Keys', {
    extend: 'B.mongo.AbstractBase',

    collectionName: 'keys',

    /**
     * Получение ключа.
     */
    getKey: function () {
        this.getCollection().findOne(
            this.makeIdQuery(),
            this.getProjection(),
            this.getCallbackCaller()
        );
    },

    /**
     * Добавление ключа.
     */
    insertKey: function () {
        this.insertManyKeys();
    },

    /**
     * Добавление множества ключей.
     */
    insertManyKeys: function () {
        this.getCollection().insert(
            this.getValue(),
            this.getOptions(),
            this.getCallbackCaller()
        );
    },

    /**
     * Удаление ключа.
     */
    deleteKey: function () {
        this.getCollection().deleteOne(
            this.makeIdQuery(),
            this.getOptions(),
            this.getCallbackCaller()
        );    
    }
});
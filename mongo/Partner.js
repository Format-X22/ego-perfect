/**
 * Утилита для получения данных партнера.
 * Является прослойкой над MongoDB драйвером,
 * все колбеки содержат оригинальные параметры.
 */
Ext.define('B.mongo.Company', {
    extend: 'B.mongo.AbstractAccount',

    collectionName: 'partner',

    /**
     * Получение данных компании.
     */
    getPartner: function () {
        this.getAccount();
    },

    /**
     * Получение данных компании по логину.
     */
    getPartnerByLogin: function () {
        this.getAccountByLogin();
    },

    /**
     * Обновление компании.
     * Поддерживается {@link #atomic}.
     */
    updatePartner: function () {
        this.updateAccount();
    },

    /**
     * Обновление компании с поиском по логину.
     * Поддерживается {@link #atomic}.
     */
    updatePartnerByLogin: function () {
        this.updateAccountByLogin();
    },

    /**
     * Добавление новой компании.
     */
    insertPartner: function () {
        this.insertAccount();
    }
});
/**
 * Утилита для получения данных компании.
 * Является прослойкой над MongoDB драйвером,
 * все колбеки содержат оригинальные параметры.
 */
Ext.define('B.mongo.Company', {
    extend: 'B.mongo.AbstractAccount',

    collectionName: 'company',
    
    /**
     * Получение данных компании.
     */
    getCompany: function () {
        this.getAccount();    
    },

    /**
     * Получение данных компании по логину.
     */
    getCompanyByLogin: function () {
        this.getAccountByLogin();
    },

    /**
     * Обновление компании.
     * Поддерживается {@link #atomic}.
     */
    updateCompany: function () {
        this.updateAccount();
    },

    /**
     * Обновление компании с поиском по логину.
     * Поддерживается {@link #atomic}.
     */
    updateCompanyByLogin: function () {
        this.updateAccountByLogin();
    },

    /**
     * Добавление новой компании.
     */
    insertCompany: function () {
        this.insertAccount();
    }
});
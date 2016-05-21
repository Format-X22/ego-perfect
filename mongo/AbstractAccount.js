/**
 * Абстрактный класс для манипуляций с аккаунтами.
 * Условия вызова {@link #badIdCallback} необходимо описать в конкретном классе.
 */
Ext.define('B.mongo.AbstractAccount', {
    extend: 'B.mongo.AbstractBase',

    config: {

        /**
         * @cfg {String/Object} id Строковый или ObjectID идентификатор документа MongoDB.
         */
        id: null,

        /**
         * @cfg {String} login Логин аккаунта.
         */
        login: null,

        /**
         * @cfg {Boolean} strictId
         * Флаг, указывающий что в случае если id не является валидным
         * идентификатором документа MongoDB - вызывать {@link #badIdCallback}.
         */
        strictId: true,

        /**
         * @cfg {Function} badIdCallback Будет вызван в случае не валидного id.
         */
        badIdCallback: Ext.emptyFn
    },

    /**
     * @protected
     * Получение данных аккаунта.
     */
    getAccount: function () {
        this.getCollection().findOne(
            this.makeIdQuery(),
            this.getProjection(),
            this.getCallbackCaller()
        );
    },

    /**
     * @protected
     * Получение данных аккаунта по логину.
     */
    getAccountByLogin: function () {
        this.getCollection().findOne(
            this.makeLoginQuery(),
            this.getProjection(),
            this.getCallbackCaller()
        );
    },

    /**
     * @protected
     * Обновление аккаунта.
     * Поддерживается {@link #atomic}.
     */
    updateAccount: function () {
        var method = this.getSingleUpdateMethodName();

        this.getCollection()[method](
            this.makeIdQuery(),
            this.getValue(),
            this.getOptions(),
            this.getCallbackCaller()
        );
    },

    /**
     * @protected
     * Обновление аккаунта с поиском по логину.
     * Поддерживается {@link #atomic}.
     */
    updateAccountByLogin: function () {
        var method = this.getSingleUpdateMethodName();

        this.getCollection()[method](
            this.makeLoginQuery(),
            this.getValue(),
            this.getOptions(),
            this.getCallbackCaller()
        );
    },

    /**
     * @protected
     * Добавление нового аккаунта.
     */
    insertAccount: function () {
        this.getCollection().insertOne(
            this.getValue(),
            this.getOptions(),
            this.getCallbackCaller()
        );
    },

    /**
     * @protected
     * Создает запрос на поиск по ID.
     * @return {Object} Объект запроса.
     */
    makeIdQuery: function () {
        return {
            _id: this.makeIdIfNeed(this.getId())
        };
    },

    /**
     * @protected
     * Создает запрос на поиск по логину.
     * @return {Object} Объект запроса.
     */
    makeLoginQuery: function () {
        return {
            login: this.getLogin()
        };
    },

    /**
     * @protected
     * Создает из строки объект MongoDB ObjectID, если параметр им ещё не является.
     * Создание происходит в безопасном режиме, в случае ошибки будет возвращен null.
     * @param {String/Object} id Строковый или ObjectID идентификатор документа MongoDB.
     * @return {Object/Null} ObjectID идентификатор документа MongoDB или null.
     */
    makeIdIfNeed: function (id) {
        if (!Ext.isObject(id)) {
            id = B.mongo.Mongo.safeMakeId(id);
        }

        return id;
    },
    
    /**
     * @protected
     * Вызывает соответствующий колбек с соответствующем скопом.
     */
    callBadIdCallback: function () {
        this.getBadIdCallback().call(this.getScope());
    }
});
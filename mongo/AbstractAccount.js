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
         * @cfg {Function} badIdCallback
         * Будет вызван за место failure в случае не валидного id.
         * При этом always также будет вызван.
         * Вызывается до фактического запроса к базе данных.
         */
        badIdCallback: Ext.emptyFn
    },

    /**
     * @protected
     * Получение данных аккаунта.
     */
    getAccount: function () {
        var query = this.makeIdQuery();
        var collection = this.getCollection();
        var projection = this.getProjection();
        var callback = this.getCallbackCaller();

        if (!query) {
            return;
        }

        if (projection) {
            collection.findOne(query, projection, callback);
        } else {
            collection.findOne(query, callback);
        }
    },

    /**
     * @protected
     * Получение данных аккаунта по логину.
     */
    getAccountByLogin: function () {
        var collection = this.getCollection();
        var query = this.makeLoginQuery();
        var projection = this.getProjection();
        var callback = this.getCallbackCaller();
        
        if (projection) {
            collection.findOne(query, projection, callback);
        } else {
            collection.findOne(query, callback);
        }
        
    },

    /**
     * @protected
     * Обновление аккаунта.
     * Поддерживается {@link #atomic}.
     */
    updateAccount: function () {
        var method = this.getSingleUpdateMethodName();
        var query = this.makeIdQuery();

        if (!query) {
            return;
        }

        this.getCollection()[method](
            query,
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
     * В случае ошибки создания ID будет возвращен null.
     * @return {Object/Null} Объект запроса или null.
     */
    makeIdQuery: function () {
        var id = this.makeIdIfNeed(this.getId());
        var query = {
            _id: id
        };

        if (id) {
            return query;
        } else {
            return null;
        }

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
     * В случае ошибки будет вызван {@link #badIdCallback}.
     * @param {String/Object} id Строковый или ObjectID идентификатор документа MongoDB.
     * @return {Object/Null} ObjectID идентификатор документа MongoDB или null.
     */
    makeIdIfNeed: function (id) {
        if (Ext.isObject(id)) {
            return id;
        }

        id = B.Mongo.safeMakeId(id);

        if (id) {
            return id;
        } else {
            this.callBadIdCallback();
            return null;
        }
    },
    
    /**
     * @protected
     * Вызывает соответствующий колбек с соответствующем скопом.
     */
    callBadIdCallback: function () {
        this.getBadIdCallback().call(this.getScope());
        this.callAlways();
    }
});
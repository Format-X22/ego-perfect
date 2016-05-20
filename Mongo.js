/**
 * Класса доступа к базе данных.
 * Обеспечивает легкую прослойку над апи драйвера Mongo.
 * Также занимается подключением и переподключением.
 */
Ext.define('B.Mongo', {
    singleton: true,

    config: {

        /**
         * @cfg {String} dataBaseLink Ссылка для подключения к базе.
         */
        dataBaseLink: outerResourcesConfig.mongo.dataBaseLink,

        /**
         * @cfg {Number} reconnectTime Время до переподключения к базе.
         */
        reconnectTime: 10 * 1000,

        /**
         * @cfg {Object} mongoDriver Объект драйвера Mongo.
         */
        mongoDriver: require('mongodb'),

        /**
         * @cfg {Object} mongoClient Клиент драйвера Mongo для подключения к базе.
         */
        mongoClient: null,

        /**
         * @cfg {Object} dataBase Объект базы данных.
         */
        dataBase: null,

        /**
         * @cfg {Function} objectIdMaker Нативный генератор Mongo ObjectID для указанного значения.
         */
        objectIdMaker: null,

        /**
         * @cfg {String} requestErrorText Текст ошибки запроса к базе данных.
         */
        requestErrorText: 'Ошибка запроса к базе данных!'
    },

    constructor: function () {
        this.initConfig(this.config);
        this.setMongoClient(this.getMongoDriver().MongoClient);
        this.setObjectIdMaker(this.getMongoDriver().ObjectID);
    },

    /**
     * Подключение к базе данных.
     * @param {Function} [callback] Следующий шаг.
     */
    connect: function (callback) {
        callback = callback || Ext.emptyFn;

        this.getMongoClient().connect(this.getDataBaseLink(), function (error, db) {
            if (error) {
                this.logConnectError(error);
                this.tryReconnect(callback);
            } else {
                this.setDataBase(db);
                this.logConnectEstablished();
                callback();
            }
        }.bind(this));
    },

    /**
     * Получение доступа к конкретной коллекции базы данных.
     * @param {String} collection Имя коллекции.
     * @return {Object} Объект коллекции.
     */
    getCollection: function (collection) {
        var db = this.getDataBase();

        if (db) {
            return db.collection(collection);
        } else {
            this.logDataBaseNotFound();
            this.connect();

            return null;
        }
    },

    /**
     * Создает Mongo ObjectID по указанному значению.
     * @param {String} value Значение для превращения в ObjectID.
     * @return {Mongo.ObjectID} Mongo ObjectID.
     */
    makeId: function (value) {
        return this.getObjectIdMaker()(value);
    },

    /**
     * Создает Mongo ObjectID по указанному значению.
     * В случае если значени не является строковым идентификатором Mongo
     * возвращает null.
     * @param {String} value Значение для превращения в ObjectID.
     * @return {Mongo.ObjectID/Null} Mongo ObjectID или Null.
     */
    safeMakeId: function (value) {
        try {
            return this.makeId(value);
        } catch (error) {
            return null;
        }
    },

    privates: {

        /**
         * @private
         * Попытка переподключения через {@link #cfg-reconnectTime} милисекунд.
         * @param {Function} callback Следующий шаг.
         */
        tryReconnect: function (callback) {
            Ext.defer(
                this.connect.bind(this, callback),
                this.getReconnectTime()
            );
        },

        /**
         * @private
         * @param {Object} error Объект ошибки базы данных.
         */
        logConnectError: function (error) {
            Ext.log({
                level: 'error',
                msg: 'Невозможно подключиться к базе!\n\n' + error
            });
        },

        /**
         * @private
         */
        logConnectEstablished: function () {
            Ext.log({
                level: 'info',
                msg: 'Соединение с базой данных установлено.'
            });
        },

        /**
         * @private
         */
        logDataBaseNotFound: function () {
            Ext.log({
                level: 'error',
                msg: 'Объект базы не существует! Попытка переподключения...'
            });
        }
    }
});
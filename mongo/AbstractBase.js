/**
 * Базовый абстрактный класс для любых манипуляций с базой данных.
 * Необходимо имплементировать метод {@link #getCollection}.
 */
Ext.define('B.mongo.AbstractBase', {

    requires: [
        'B.mongo.Mongo'
    ],
    
    config: {

        /**
         * @cfg {Object} query
         * Объект запроса для поиска.
         * Необходим для методов получения произвольного набора данных.
         */
        query: null,

        /**
         * @cfg {Object} projection
         * Объект-список полей, которые необходимо получить из базы, проекция.
         * Используется для методов получения данных.
         * Для методов любого изменения данных проекцию необходимо указывать в {@link #options},
         * в поле projection, как того требует драйвер.
         * Автоматическая устрановка этого значения в {@link #options} не реализована
         * дабы не возникало двояково поведения при вызове несколько разных методов
         * в рамках одного инстанса этого класса.
         */
        projection: null,

        /**
         * @cfg {Object} options
         * Объект-список опций, которые будут использованы для запроса.
         * Используется для методов любого изменения данных.
         */
        options: null,
        
        /**
         * @cfg value
         * Значение-запрос для обновления или значение для добавления.
         * Используется для методов изменения и добавления данных.
         */
        value: null,

        /**
         * @cfg {Boolean}
         * Необходимо ли блокировать документ на время выполнения операции.
         * Используется для методов изменения данных.
         * Поддерживается не везде, поддержка указана в описании конкретного метода.
         */
        atomic: false,
        
        /**
         * @cfg {Function} success
         * Будет вызван после успешной операции.
         * Первым аргументом будет объект результата исполнения.
         */
        success: Ext.emptyFn,

        /**
         * @cfg {Function} failure
         * Будет вызван после провальной операции.
         * Первым аргументом будет объект ошибки.
         */
        failure: Ext.emptyFn,

        /**
         * @cfg {Function} always
         * Будет вызван после любой операции.
         * Первым аргументом будет объект ошибки или null.
         * Вторым аргументом будет объект результата исполнения.
         * Вызывается последним, после всех других соответствующих колбеков.
         */
        always: Ext.emptyFn,

        /**
         * @cfg {Object} scope Контекст исполнения колбеков.
         */
        scope: null,

        /**
         * @cfg {Boolean} autoDestroy
         * Флаг, указывающий на то что необходимо автоматически уничтожать
         * инстанс класса после первого завершения исполнения. Является оптимизацией памяти.
         * В случае необходимости повторных вызовов нужно проставить флаг в false.
         */
        autoDestroy: true,

        /**
         * @protected
         * @cfg {String} collectionName (required)
         * Имя коллекции в базе данных, над которой будут происходить манипуляции.
         */
        collectionName: ''
    },
    
    constructor: function (config) {
        this.initConfig(
            Ext.apply(
                Ext.clone(this.config),
                config
            )
        );
    },

    /**
     * Получение оригинального MongoDB указателя на коллекцию данных.
     * Может быть необходимо в случае ручного выполнения запросов.
     * @return {Object} Указатель.
     */
    getCollection: function () {
        return B.Mongo.getCollection(this.getCollectionName());    
    },

    /**
     * @protected
     * Вызывает соответствующий колбек с соответствующем скопом.
     * После вызывает {@link #always} колбек.
     */
    callSuccess: function () {
        this.getSuccess().apply(this.getScope(), arguments);
        this.callAlways();
    },

    /**
     * @protected
     * Вызывает соответствующий колбек с соответствующем скопом.
     * После вызывает {@link #always} колбек.
     */
    callFailure: function () {
        this.getFailure().apply(this.getScope(), arguments);
        this.callAlways();
    },

    /**
     * @protected
     * Вызывает соответствующий колбек с соответствующем скопом.
     * После, при необходимости, уничтожает класс.
     */
    callAlways: function () {
        this.getSuccess().apply(this.getScope(), arguments);

        if (this.getAutoDestroy()) {
            this.destroy();
        }
    },

    /**
     * @protected
     * Вызывает соответсвующие колбеки в зависимости от результата.
     * @param {Object/Null} error Объект ошибки или null.
     * @param {Object} result Объект результата.
     */
    callCallback: function (error, result) {
        if (error) {
            this.callFailure(error);
        } else {
            this.callSuccess(result);
        }
    },

    /**
     * @protected
     * Возвращает вызыватель колбеков {@link callCallback},
     * пригодный для отправки колбеком в драйвер MongoDB.
     * @return {Function} {@link callCallback}
     */
    getCallbackCaller: function () {
        return this.callCallback.bind(this);
    },

    /**
     * @protected
     * Возвращает имя метода драйвера,
     * который нужно вызвать чтобы обновить один документ.
     * Имя может различаться в зависимости от конфига класса.
     * @return {String} Имя метода.
     */
    getSingleUpdateMethodName: function () {
        if (this.getAtomic()) {
            return 'findOneAndUpdate';
        } else {
            return 'updateOne';
        }
    }
});
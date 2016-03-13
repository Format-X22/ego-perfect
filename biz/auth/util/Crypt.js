/**
 * Класс для работы с шифрованными данными.
 */
Ext.define('B.biz.auth.util.Crypt', {

    config: {

        /**
         * @cfg {Function} callback
         * Следующий шаг, будет вызван сразу после того как будут найдены данные аккаунта.
         * Первым параметром получает this этого класса.
         */
        callback: null,

        /**
         * @cfg {Object} scope Контекст исполнения калбека.
         */
        scope: null,

        /**
         * @cfg {String} login Логин.
         */
        login: null,

        /**
         * @cfg {String} pass Пароль.
         */
        pass: null,

        /**
         * @cfg {String} hash Хэш пароля.
         */
        hash: null,

        /**
         * @cfg {String} session Ключ сессии.
         */
        session: null,

        /**
         * @cfg {Boolean} checkPassResult Результат проверки пароля.
         */
        checkPassResult: null,

        /**
         * @private
         * @cfg {Object} bcrypt Объект Bcrypt.
         */
        bcrypt: require('bcrypt'),

        /**
         * @private
         * @cfg {String} passSaltPrefix Префикс пароля.
         */
        passSaltPrefix: 'J',

        /**
         * @private
         * @cfg {String} passSaltPostfix Постфикс пароля.
         */
        passSaltPostfix: 'ucanhackit',

        /**
         * @private
         * @cfg {String} sessionSaltPrefix Префикс сессии.
         */
        sessionSaltPrefix: 'K',

        /**
         * @private
         * @cfg {String} sessionSaltPostfix Постфикс сессии.
         */
        sessionSaltPostfix: 'uCaNhaCkUt',

        /**
         * @private
         * @cfg {String} newPassSalt Соль нового пароля.
         */
        newPassSalt: 'rDdasPf'
    },

    constructor: function (config) {
        Ext.apply(this.config, config);
        this.initConfig(this.config);
    },

    /**
     * Создает пароль и хеш для него.
     * Требуется указать логин в конфиге класса.
     */
    makePassAndHash: function () {
        var originCallback = this.getCallback();

        this.setCallback(function () {
            this.setCallback(originCallback);
            this.makePassHash();
        }.bind(this));
        this.makePass();
    },

    /**
     * Создает пароль.
     * Требуется указать логин в конфиге класса.
     */
    makePass: function () {
        this.getBcrypt().hash(this.getLogin(), 3, function (error, passTpl) {
            if (!error && passTpl) {
                this.setPass(passTpl.slice(7, 15));
            }
            this.callCallback();
        }.bind(this));
    },

    /**
     * Создает хэш пароля.
     * Требуется указать пароль в конфиге класса.
     */
    makePassHash: function () {
        this.getBcrypt().hash(this.getPassSalt(), 9, function (error, hash) {
            if (!error && hash) {
                this.setHash(hash);
            }
            this.callCallback();
        }.bind(this));
    },

    /**
     * Проверяет соответствие пароля и хэша.
     * Требуется указать пароль и хэш в конфиге класса.
     * Результат будет записан в конфиг {@link #cfg-checkPassResult}.
     */
    checkPass: function () {
        this.getBcrypt().compare(this.getPassSalt(), this.getHash(), function (error, result) {
            if (!error && result) {
                this.setCheckPassResult(true);
            } else {
                this.setCheckPassResult(false);
            }
            this.callCallback();
        }.bind(this));
    },

    /**
     * Создает ключ сессии.
     * Требуется указать логин в конфиге класса.
     */
    makeSession: function () {
        this.getBcrypt().hash(this.getSessionSalt(), 9, function(error, hash) {
            if (!error && hash) {
                this.setSession(hash.slice(8));
            }
            this.callCallback();
        }.bind(this));
    },

    privates: {

        /**
         * @private
         */
        callCallback: function () {
            this.getCallback().call(this.getScope(), this);
        },

        /**
         * @private
         * @return {String} Посоленная строка.
         */
        getPassSalt: function () {
            return this.getPassSaltPrefix() + this.getPass() + this.getPassSaltPostfix();
        },

        /**
         * @private
         * @return {String} Посоленная строка.
         */
        getSessionSalt: function () {
            var originSalt = this.getSessionSaltPrefix() + this.getLogin() + this.getSessionSaltPostfix();
            var random = String(Math.random() * Math.random());
            var arraySalt = originSalt.split('');

            arraySalt.splice(5, 0, random);

            return arraySalt.join('') + random.slice(5);
        }
    }
});
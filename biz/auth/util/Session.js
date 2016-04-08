/**
 * Утилита для работы с сессиями.
 */
Ext.define('B.biz.auth.util.Session', {

    requires: [
        'B.biz.auth.util.Account',
        'B.biz.auth.util.Crypt'
    ],

    config: {

        /**
         * @cfg {String} type Тип аккаунта.
         */
        type: null,

        /**
         * @cfg {String} login Логин.
         */
        login: null,

        /**
         * @cfg {String} session Ключ сессии.
         */
        session: null,

		/**
		 * @cfg {Boolean} error Была ли ошибка при выполнении.
         */
        error: false,

        /**
         * @cfg {Object} account Объект данных аккаунта.
         */
        account: null,

        /**
         * @cfg {Function} callback
         * Следующий шаг, первым параметром получает this этого класса.
         */
        callback: null,

        /**
         * @cfg {Object} scope Контекст исполнения калбека.
         */
        scope: null,

        /**
         * @private
         * @cfg {Function[]} stepQueue Очередь исполнения.
         */
        stepQueue: null
    },

    constructor: function (config) {
        Ext.apply(this.config, config);
        this.initConfig(this.config);
        this.setStepQueue([]);
    },

    /**
     * Создает и сохраняет сессию в аккаунте.
     * Требуется указать логин в конфиге класса.
     * Опционально - тип аккаунта, ускорит поиск.
     * Указание объета аккаунта ещё более ускоряет процесс.
     */
    addSession: function () {
        this.setError(false);

        this.getStepQueue().push(function () {
            if (this.getError()) {
                this.callCallback();
                return;
            }

            this.saveSession();
        });

        this.makeSession();
    },

	/**
	 * Создает сессию.
     * Проксирует вызов на утилиту Crypt - {@link B.biz.auth.util.Crypt#makeSession}.
     * Требует указания логина в конфиге класса.
     */
    makeSession: function () {
        this.setError(false);

        var crypt = Ext.create('B.biz.auth.util.Crypt', {
            login: this.getLogin(),
            scope: this,
            callback: this.handleMakeSession
        });

        crypt.makeSession();
    },

    /**
     * Сохраняет сессию в аккаунте.
     * Требуется указать логин в конфиге класса.
     * Опционально - тип аккаунта, ускорит поиск.
     * Указание объета аккаунта вместе с типом аккаунта
     * ещё более ускоряет процесс.
     */
    saveSession: function () {
        this.setError(false);

        this.makeAccountUtil(function () {
            B.Mongo
                .getCollection(this.getType())
                .findOneAndUpdate(
                    {
                        login: this.getLogin()
                    },
                    {
                        $set: {
                            session: this.getSession()
                        }
                    },
                    this.handleSessionModify.bind(this)
                );
        });
    },

    /**
     * Удаляет сессию из аккаунта.
     * Требуется указать сессию в конфиге класса.
     */
    removeSession: function () {
        this.setError(false);

        this.getAccountData(function () {
            B.Mongo
                .getCollection(this.getType())
                .findOneAndUpdate(
                    {
                        login: this.getLogin()
                    },
                    {
                        $set: {
                            session: ''
                        }
                    },
                    this.handleSessionModify.bind(this)
                );
        });
    },

    privates: {

        /**
         * @private
         */
        callCallback: function () {
            var queue = this.getStepQueue();

            if (queue.length) {
                queue.shift().call(this);
            } else {
                this.getCallback().call(this.getScope(), this);
            }
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        getAccountData: function (next) {
            var accData = this.getAccount();
            var type = this.getType();

            if (accData && type) {
                next.call(this);
            } else {
                this.makeAccountUtil(
                    this.getAccountDataHandler(next)
                );
            }
        },

		/**
         * @private
		 * @param {Function} next Следующий шаг.
         */
        makeAccountUtil: function (next) {
            Ext.create('B.biz.auth.util.Account', {
                login: this.getLogin(),
                type: this.getType(),
                key: this.getSession(),
                scope: this,
                callback: next
            });
        },

		/**
		 * @private
         * @param {Function} next Следующий шаг.
         */
        getAccountDataHandler: function (next) {
            return function (accUtil) {
                var accData = accUtil.getFullAccountData();

                if (!this.getType()) {
                    this.setType(accUtil.getType());
                }

                if (accData) {
                    this.setAccount(accData);
                    this.setLogin(accUtil.getLogin());
                    next.call(this, accData);
                } else {
                    this.setError(true);
                    this.callCallback();
                }
            }.bind(this);
        },

		/**
		 * @private
         * @param {B.biz.auth.util.Crypt} crypt Объект криптографии.
         */
        handleMakeSession: function (crypt) {
            var session = crypt.getSession();

            if (!session) {
                this.setError(true);
            }

            this.setSession(session);
            this.callCallback();
        },

        /**
         * @private
         * @param {Object} error Объект ошибки.
         */
        handleSessionModify: function (error) {
            if (error) {
                this.setError(true);
            }

            this.callCallback();
        }
    }
});
/**
 * Получение данных аккаунта.
 * При создании сразу начинает поиск аккаунта.
 * Необходимо указать логин или ключ сессии аккаунта,
 * при возможности - тип аккаунта.
 * Содержит методы для получения всех данных аккаунта,
 * либо очищенных от приватных данных.
 */
Ext.define('B.biz.auth.util.Account', {

    statics: {

        /**
         * Удаляет из объекта данных приватные данные аккаунта.
         * @param {Object} account Объект данных.
         * @return {Object} Очищенный объект.
         */
        sanitiseAccountData: function (account) {
            delete account.login;
            delete account.pass;
            delete account.session;
            delete account.randomSalt;

            return account;
        }
    },

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
         * @cfg {String} type
         * Тип аккаунта. Указание ускоряет поиск.
         * После того как аккаунт найдет - содержит тип найденного аккаунта.
         */
        type: null,

        /**
         * @cfg {String} login Логин аккаунта, если известен.
         */
        login: null,

        /**
         * @cfg {String} key Ключ сессии, если известен.
         */
        key: null,

        /**
         * @cfg {Object} fullAccountData Полный набор данных аккаунта.
         */
        fullAccountData: null,

        /**
         * @private
         * @cfg {Function[]} stepQueue Очередь исполнения.
         */
        stepQueue: null,

        /**
         * @private
         * @cfg {Object} searchProps Параметры поиска.
         */
        searchProps: null
    },

    constructor: function (config) {
        Ext.apply(this.config, config);
        this.initConfig(this.config);

        this.setStepQueue([]);

        if (this.getLogin()) {
            this.setSearchProps({
                login: this.getLogin()
            });
            this.autoTypeSearch();
            return;
        }

        if (this.getKey()) {
            this.setSearchProps({
                session: this.getKey()
            });
            this.autoTypeSearch();
            return;
        }

        this.callCallback();
    },

    /**
     * Возвращает набор данных аккаунта без приватных полей.
     * @return {Object} Набор данных.
     */
    getSafeAccountData: function () {
        var data = this.getFullAccountData();

        return this.self.sanitiseAccountData(data);
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
         */
        autoTypeSearch: function () {
            if (this.getType()) {
                this.search();
                return;
            }

            this.setType('company');
            this.getStepQueue().push(function () {
                if (this.getFullAccountData()) {
                    this.callCallback();
                } else {
                    this.setType('partner');
                    this.search();
                }
            });
            this.search();
        },

        /**
         * @private
         */
        search: function () {
            B.Mongo
                .getCollection(this.getType())
                .find(this.getSearchProps())
                .limit(1)
                .next(this.handleSearchResult.bind(this));
        },

        /**
         * @private
         * @param {Object} error Ошибка.
         * @param {Object} account Аккаунт.
         */
        handleSearchResult: function (error, account) {
            if (!error && account) {
                this.setFullAccountData(account);
            }

            this.callCallback();
        }
    }
});
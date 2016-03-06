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
    },

    /**
     * Создает и сохраняет сессию в аккаунте.
     * Требуется указать логин в конфиге класса.
     * Опционально - тип аккаунта, ускорит поиск.
     */
    addSession: function () {
        //
    },

    /**
     * Сохраняет сессию в аккаунте.
     * Требуется указать логин в конфиге класса.
     * Опционально - тип аккаунта, ускорит поиск.
     */
    saveSession: function () {
        var accountUtil = this.getAccountData(function (accountUtil) {
            var data = accountUtil.getFullAccountData();

            if (!data) {
                this.callCallback();
                return;
            }

            B.Mongo
                .getCollection(account.getType())
                .findOneAndUpdate(
                    {
                        login: model.get('login')
                    },
                    {
                        $set: {
                            session: this.getSession()
                        }
                    },
                    this.handleSessionSave.bind(this)
                );
        });
    },

    /**
     * Удаляет сессию из аккаунта.
     * Требуется указать сессию в конфиге класса.
     */
    removeSession: function () {
        //
    },

    /**
     * @private
     * @param {Function} callback Следующий шаг.
     */
    getAccountData: function (callback) {
        Ext.create('B.biz.auth.util.Account', {
            login: this.getLogin(),
            type: this.getType(),
            scope: this,
            callback: callback.call(this)
        });
    }
});
/**
 * Логика входа на сайт.
 */
Ext.define('B.biz.auth.Login', {
    extend: 'B.AbstractRequestHandler',

    requires: [
        'B.biz.auth.util.Account',
        'B.biz.auth.util.Crypt'
    ],

    config: {

        /**
         * @private
         * @cfg {Object} account Объект данных аккаунта.
         */
        account: null,

        /**
         * @private
         * @cfg {B.biz.auth.util.Crypt} crypt Утилита криптографии.
         */
        crypt: null
    },

    constructor: function () {
        this.callParent(arguments);

        var model = this.getRequestModel();

        Ext.create('B.biz.auth.util.Account', {
            login: model.get('login'),
            type: model.get('type'),
            scope: this,
            callback: this.handleAccountSearch
        });
    },

    privates: {

        /**
         * @private
         * @param {B.biz.auth.util.Account} accountUtil Утилита данных аккаунта.
         */
        handleAccountSearch: function (accountUtil) {
            var account = accountUtil.getFullAccountData();

            if (account) {
                this.setAccount(account);
                this.makeCrypt();
                this.checkPass();
            } else {
                this.sendError();
            }
        },

        /**
         * @private
         */
        makeCrypt: function () {
            var model = this.getRequestModel();
            var crypt = Ext.create('B.biz.auth.util.Crypt', {
                login: model.get('login'),
                pass: model.get('pass'),
                hash: this.getAccount().pass,
                scope: this
            });

            this.setCrypt(crypt);
        },

        /**
         * @private
         */
        checkPass: function () {
            var crypt = this.getCrypt();

            crypt.setCallback(this.handlePassCheck);
            crypt.checkPass();
        },

        /**
         * @private
         * @param {B.biz.auth.util.Crypt} crypt Утилита криптографии.
         */
        handlePassCheck: function (crypt) {
            if (crypt.getCheckPassResult()) {
                this.makeSession();
            } else {
                this.sendError();
            }
        },

        /**
         * @private
         */
        makeSession: function () {
            var crypt = this.getCrypt();

            crypt.setCallback(this.handleSessionMake);
            crypt.makeSession();
        },

        /**
         * @private
         * @param {B.biz.auth.util.Crypt} crypt Утилита криптографии.
         */
        handleSessionMake: function (crypt) {
            if (crypt.getSession()) {
                this.saveSession();
            } else {
                this.sendError();
            }
        },

        /**
         * @private
         */
        saveSession: function () {
            var model = this.getRequestModel();
            var crypt = this.getCrypt();

            B.Mongo
                .getCollection(model.get('type'))
                .findOneAndUpdate(
                    {
                        login: model.get('login')
                    },
                    {
                        $set: {
                            session: crypt.getSession()
                        }
                    },
                    this.handleSessionSave.bind(this)
                );
        },

        /**
         * @private
         * @param {Object} error Объект ошибки.
         */
        handleSessionSave: function (error) {
            if (error) {
                this.sendError();
            } else {
                this.setSessionCookie();
                this.sendSuccess();
            }
        },

        /**
         * @private
         */
        setSessionCookie: function () {
            this.getExpressResponse().cookie('key', this.getCrypt().getSession(), {
                httpOnly: true
            });
        },

        /**
         * @private
         */
        sendSuccess: function () {
            this.getProtocol().sendSuccess();
        },

        /**
         * @private
         */
        sendError: function () {
            this.getProtocol().sendError('Не верный логин или пароль!');
        }
    }
});
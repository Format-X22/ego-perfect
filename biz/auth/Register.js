/**
 * Логика регистрации.
 */
Ext.define('B.biz.auth.Register', {
    extend: 'B.AbstractRequestHandler',

    requires: [
        'B.Mail',
        'B.biz.auth.util.Account',
        'B.biz.auth.util.Crypt',
        'B.biz.auth.util.Session'
    ],

    config: {

		/**
         * @private
         * @cfg {B.biz.auth.util.Crypt} crypt Объект криптографии.
         */
        crypt: null,

        /**
         * @private
         * @cfg {B.biz.auth.util.Session} sessionUtil Утилита сессий.
         */
        sessionUtil: null
    },

    constructor: function () {
        this.callParent(arguments);

        B.util.Function.queue([
            this.checkDuplicateStep,
            this.makePassAndHashStep,
            this.createCompanyStep,
            this.sendMailStep,
            this.makeSessionStep,
            this.setSessionCookie,
            this.sendSuccess
        ], this);
    },

    privates: {

		/**
         * @private
         * @param {Function} next Следующий шаг.
         */
        checkDuplicateStep: function (next) {
            var model = this.getRequestModel();

            Ext.create('B.biz.auth.util.Account', {
                login: model.get('login'),
                type: model.get('type'),
                scope: this,
                callback: function (accUtil) {
                    if (accUtil.getFullAccountData()) {
                        this.sendError('Такой аккаунт уже существует!');
                    } else {
                        next();
                    }
                }
            });
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        makePassAndHashStep: function (next) {
            var model = this.getRequestModel();

            var crypt = Ext.create('B.biz.auth.util.Crypt', {
                login: model.get('login'),
                scope: this,
                callback: function () {
                    if (!crypt.getPass()) {
                        this.sendError('Ошибка генерации пароля!');
                    } else {
                        next();
                    }
                }
            });

            this.setCrypt(crypt);
            crypt.makePassAndHash();
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        createCompanyStep: function (next) {
            var model = this.getRequestModel();
            var login = model.get('login');
            var type = model.get('type');
            var hash = this.getCrypt().getHash();
            var collection = B.Mongo.getCollection(type);
            var companyObject = {
                login: login,
                pass: hash,
                type: type
            };

            collection.insertOne(companyObject, function (error) {
                if (error) {
                    this.sendError('Ошибка создания аккаунта!');
                } else {
                    next();
                }
            }.bind(this));
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        sendMailStep: function (next) {
            var model = this.getRequestModel();
            var pass = this.getCrypt().getPass();

            Ext.create('B.Mail', {
                login: model.get('login'),
                pass: pass,
                type: model.get('type'),
                scope: this,
                callback: function (mailer) {
                    if (mailer.getError()) {
                        this.sendError('Ошибка отправки письма с паролем!');
                    } else {
                        next();
                    }
                }
            }).sendAuthMail();
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        makeSessionStep: function (next) {
            var model = this.getRequestModel();

            Ext.create('B.biz.auth.util.Session', {
                login: model.get('login'),
                type: model.get('type'),
                scope: this,
                callback: function (util) {
                    this.setSessionUtil(util);

                    if (util.getError()) {
                        this.sendError('Ошибка создания сессии!');
                    } else {
                        next();
                    }
                }
            }).addSession();
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        setSessionCookie: function (next) {
            this.getExpressResponse().cookie('key', this.getSessionUtil().getSession(), {
                httpOnly: true
            });
            next();
        }
    }
});
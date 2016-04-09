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
        sessionUtil: null,

		/**
		 * @private
         * @cfg {String} accountId Айди аккаунта клиента.
         */
        accountId: null,

        /**
         * @private
         * @cfg {Date/Null} payDate Время следующей оплаты.
         */
        payDate: null
    },

    constructor: function () {
        this.callParent(arguments);

        B.util.Function.queue([
            this.checkDuplicateStep,
            this.makePassAndHashStep,
            this.checkSpecialKeyStep,
            this.createCompanyStep,
			this.registerPartnerKeyStep,
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
        checkSpecialKeyStep: function (next) {
            var model = this.getRequestModel();
            var type = model.get('type');
            var partner = model.get('partner');
            var collection = B.Mongo.getCollection('keys');
            var search;

            if (type !== 'company' || !partner) {
                next();
                return;
            }

            try {
                search = {
                    _id: B.Mongo.makeId(partner)
                }
            } catch (error) {
                next();
                return;
            }

            this.useKey(collection, search, next);
        },

        /**
         * @private
         * @param {Object} collection Коллекция для поиска.
         * @param {Object} search Поисковый запрос.
         * @param {Function} next Следующий шаг.
         */
        useKey: function (collection, search, next) {
            collection.findOne(
                search,
                function (error, doc) {
                    if (doc) {
                        var month = doc.month;
                        var date = Ext.Date.add(new Date(), Ext.Date.MONTH, month);

                        this.setPayDate(date);

                        collection.deleteOne(search);
                    }
                    next();
                }.bind(this)
            );
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
                type: type,
				registerDate: new Date()
            };

			if (type === 'company') {
				companyObject.rating = 0;
				companyObject.views = 0;
				companyObject.reviews = [];
                companyObject.payDate = this.getPayDate();
			}

            if (type === 'partner') {
                companyObject.clients = [];
                companyObject.partners = [];
            }

            collection.insertOne(companyObject, function (error, result) {
                if (error) {
                    this.sendError('Ошибка создания аккаунта!');
                } else {
                    this.setAccountId(result.insertedId);
                    next();
                }
            }.bind(this));
        },

		/**
		 * @private
		 * @param {Function} next Следующий шаг.
		 */
		registerPartnerKeyStep: function (next) {
			var key = this.getRequestModel().get('partner');
            var id;

			if (!key) {
				next();
				return;
			}

            try {
                id = B.Mongo.makeId(key);
            } catch (error) {
                next();
                return;
            }

			B.Mongo
				.getCollection('partner')
				.findOneAndUpdate(
					{
						_id: id
					},
					{
						$push: this.getPushPartnerKeyConfig()
					},
					function (error) {
						if (error) {
							this.sendError('Ошибка прикрепления аккаунта к партнеру!');
						} else {
							next();
						}
					}
				);
		},

		/**
		 * @private
		 * @return {Object} Конфиг.
		 */
		getPushPartnerKeyConfig: function () {
			var config = {};
			var field = this.getPushPartnerKeyFieldName();

			config[field] = this.getAccountId();

			return config;
		},

		/**
		 * @private
		 * @return {String} Имя поля.
		 */
		getPushPartnerKeyFieldName: function () {
			switch (this.getRequestModel().get('type')) {
				case 'company':
					return 'clients';
				case 'partner':
					return 'partners';
			}
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
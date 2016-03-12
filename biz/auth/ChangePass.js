/**
 * Логика смены пароля.
 */
Ext.define('B.biz.auth.ChangePass', {
    extend: 'B.AbstractRequestHandler',

	requires: [
		'B.Mail',
		'B.biz.auth.util.Account',
		'B.biz.auth.util.Crypt',
		'B.biz.auth.util.Session'
	],

	config: {

		/**
		 * @cfg {Object} account Данные аккаунта.
		 */
		account: null,

		/**
		 * @cfg {B.biz.auth.util.Crypt} crypt Объект криптографии.
		 */
		crypt: null
	},

    constructor: function () {
        this.callParent(arguments);

		B.util.Function.queue([
			this.checkAccountExistStep,
			this.makeNewPassStep,
			this.sendMailStep,
			this.updateAccountStep,
			this.sendSuccess
		], this);
    },

	privates: {

		/**
		 * @private
		 * @param {Function} next Следующий шаг.
		 */
		checkAccountExistStep: function (next) {
			var model = this.getRequestModel();

			Ext.create('B.biz.auth.util.Account', {
				key: model.get('key'),
				scope: this,
				callback: function (acc) {
					var accData = acc.getFullAccountData();

					this.setAccount(accData);

					if (accData) {
						next();
					} else {
						this.sendError('Такого аккаунта не существует!');
					}
				}
			});
		},

		/**
		 * @private
		 * @param {Function} next Следующий шаг.
		 */
		makeNewPassStep: function (next) {
			Ext.create('B.biz.auth.util.Crypt', {
				login: this.getAccount().login,
				scope: this,
				callback: function (crypt) {
					this.setCrypt(crypt);

					if (crypt.getHash()) {
						next();
					} else {
						this.sendError('Невозможно создать новый пароль!');
					}
				}
			}).makePassAndHash();
		},

		/**
		 * @private
		 * @param {Function} next Следующий шаг.
		 */
		sendMailStep: function (next) {
			var accData = this.getAccount();
			var crypt = this.getCrypt();

			Ext.create('B.Mail', {
				login: accData.login,
				pass: crypt.getPass(),
				type: accData.type,
				scope: this,
				callback: function (mailer) {
					if (mailer.getError()) {
						this.sendError('Невозможно отправить письмо с паролем! Будет оставлен старый пароль.');
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
		updateAccountStep: function (next) {
			var accData = this.getAccount();
			var crypt = this.getCrypt();

			B.Mongo
				.getCollection(accData.type)
				.findOneAndUpdate(
					{
						login: accData.login
					},
					{
						$set: {
							pass: crypt.getHash(),
							session: ''
						}
					},
					function (error) {
						if (error) {
							this.sendError('Ошибка записи пароля в базу данных!');
						} else {
							next();
						}
					}.bind(this)
				);
		}
	}
});
/**
 * Абстрактный класс для различных действий над паролем.
 */
Ext.define('B.biz.auth.AbstractPassModify', {
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

	/**
	 * @protected
	 * @template
	 * @method checkAccountExistStep
	 * Шаг определения наличия аккаунта, для которого производится изменение.
	 * @param {Function} next Следующий шаг.
	 */
	checkAccountExistStep: Ext.emptyFn,

	/**
	 * @protected
	 * Шаг генерации нового пароля.
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
	 * @protected
	 * Шаг отправки письма с новыми авторизационными данными.
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
	 * @protected
	 * Шаг обновления данных аккаунта.
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
});
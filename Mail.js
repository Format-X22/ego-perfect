/**
 * Утилита работы с почтой.
 */
Ext.define('B.Mail', {

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
		 * @cfg {String} pass Пароль.
		 */
		pass: null,

		/**
		 * @cfg {Function} callback Следующий шаг после отправки.
		 */
		callback: null,

		/**
		 * @cfg {Object} scope Контекст исполнения калбека.
		 */
		scope: null,

		/**
		 * @cfg {Boolean} error Имела ли место ошибка при выполнении.
		 */
		error: false,

		/**
		 * @private
		 * @cfg {Object} sender Отправщик писем.
		 */
		sender: require('sendgrid')('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'),

		/**
		 * @private
		 * @cfg {String} authMailTpl Шаблон письма авторизации.
		 */
		authMailTpl: [
			'Данные для входа на сайт фирмы.онлайн',
			'Тип аккаунта: {type}',
			'Ваш логин: {login}',
			'Ваш пароль: {pass}',
			'Не сообщайте пароль никому, даже сотруднику Фирмы Онлайн.'
		].join('\n\r')
	},

	constructor: function (config) {
		Ext.apply(this.config, config);
		this.initConfig(this.config);
	},

	/**
	 * Отправляет авторизационное письмо,
	 * содержащие логин, пароль и тип аккаунта.
	 * Подходит для любых писем с этими полями.
	 */
	sendAuthMail: function () {
		this.setError(false);

		var type = this.getPrettyTypeName();
		var login = this.getLogin();
		var pass = this.getPass();
		var tpl = new Ext.Template(this.getAuthMailTpl());

		this.getSender().send(
			{
				from: 'robot@xn--h1ailo2b.xn--80asehdb',
				to: login,
				subject: 'Пароль для Фирмы Онлайн',
				text: tpl.apply({
					type: type,
					login: login,
					pass: pass
				})
			},
			this.sendCallback.bind(this)
		);
	},

	privates: {

		/**
		 * @private
		 * @param {Object} error Объект ошибки.
		 */
		sendCallback: function (error) {
			if (error) {
				this.setError(true);
			}

			this.getCallback().call(this.getScope(), this);
		},

		/**
		 * @private
		 * @return {String} Тип аккаунта для чтения в письме.
		 */
		getPrettyTypeName: function () {
			switch (this.getType()) {
				case 'company':
					return 'Клиент';
				case 'partner':
					return 'Партнер';
			}
		}
	}
});
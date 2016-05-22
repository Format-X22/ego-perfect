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
		callback: Ext.emptyFn,

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
		sender: require('sendgrid')(outerResourcesConfig.sendGrid.apiKey),

        /**
         * @private
         * @cfg {String} signature Подпись писем.
         */
        signature: [
            '',
            '_________________________',
            'ООО "Простые числа"',
            'contact@фирмы.онлайн',
            '+7 (925) 154-68-79'
        ].join('\n\r')
	},

	constructor: function (config) {
		this.initConfig(config);
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
        var signature = this.getSignature();
		var tpl = new Ext.Template([
            'Данные для входа на сайт фирмы.онлайн',
            'Тип аккаунта: {type}',
            'Ваш логин: {login}',
            'Ваш пароль: {pass}',
            'Не сообщайте пароль никому, даже сотруднику Фирмы Онлайн.',
            '{signature}'
        ].join('\n\r'));

		this.getSender().send(
			{
				from: 'robot@xn--h1ailo2b.xn--80asehdb',
				to: login,
				subject: 'Пароль для Фирмы Онлайн',
				text: tpl.apply({
					type: type,
					login: login,
					pass: pass,
                    signature: signature
				})
			},
			this.sendCallback.bind(this)
		);
	},

    /**
     * Отправляет письмо о том что необходимо заключить
     * бумажный договор для завершения оформления партнером.
     */
    sendPartnerRegistrationMail: function () {
        this.setError(false);

        this.getSender().send(
            {
                from: 'contact@xn--h1ailo2b.xn--80asehdb',
                to: this.getLogin(),
                subject: 'Заключение договора с Фирмы Онлайн',
                text: [
                    'Здравствуйте!',
                    'Только что вы зарегистрировались на сайте фирмы.онлайн в качестве партнера.',
                    'Для завершения этого процесса необходимо заключить официальный договор.',
                    'Для этого просто напишите в ответ на это письмо или позвоните по номеру +7 (925) 154-68-79.',
                    this.getSignature()
                ].join('\n\r')
            },
            this.sendCallback.bind(this)
        );
    },

    /**
     * Уведомляет партнера о том что кто-то зарегистрировался по его ключу.
     * @param {String} clientLogin Логин клиента.
     */
	notifyPartnerAboutUseKey: function (clientLogin) {
        this.getSender().send(
            {
                from: 'contact@xn--h1ailo2b.xn--80asehdb',
                to: this.getLogin(),
                subject: 'Хорошие новости! Кто-то использовал ваш ключ!',
                text: [
                    'Здравствуйте!',
                    'Клиент с логином ' + clientLogin + ' вопспользовался вашим ключем при регистрации!',
                    'Теперь от всех его платежей вы будете получать свои проценты.',
                    this.getSignature()
                ].join('\n\r')
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
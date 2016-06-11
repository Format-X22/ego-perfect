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
            '<hr>ООО "Простые числа"',
			'<a href="http://фирмы.онлайн/">http://фирмы.онлайн</a>',
            '<a href="mailto:w@фирмы.онлайн">w@фирмы.онлайн</a>',
            '+7 (925) 154-68-79'
        ].join('<br><br>')
	},

	constructor: function (config) {
        this.initConfig(
            Ext.apply(
                Ext.clone(this.config),
                config
            )
        );
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
            'Данные для входа на сайт <a href="http://фирмы.онлайн/">фирмы.онлайн</a>',
            'Тип аккаунта: {type}',
            'Ваш логин: {login}',
            'Ваш пароль: {pass}',
            'Не сообщайте пароль никому, даже сотруднику компании.',
            '{signature}'
        ].join('<br><br>'));

		this.getSender().send(
			{
				from: 'robot@xn--h1ailo2b.xn--80asehdb',
				to: login,
				subject: 'Пароль для Фирмы Онлайн',
				html: tpl.apply({
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
                from: 'w@xn--h1ailo2b.xn--80asehdb',
                to: this.getLogin(),
                subject: 'Заключение договора с Фирмы Онлайн',
                hlml: [
                    'Здравствуйте!',
                    'Только что вы зарегистрировались на сайте фирмы.онлайн в качестве партнера.',
                    'Для завершения этого процесса необходимо заключить официальный договор.',
                    'Для этого просто напишите в ответ на это письмо или позвоните по номеру +7 (925) 154-68-79.',
                    this.getSignature()
                ].join('<br><br>')
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
                from: 'robot@xn--h1ailo2b.xn--80asehdb',
                to: this.getLogin(),
                subject: 'Хорошие новости! Кто-то использовал ваш ключ!',
                html: [
                    'Здравствуйте!',
                    'Клиент с логином ' + clientLogin + ' вопспользовался вашим ключем при регистрации!',
                    'Теперь от всех его платежей вы будете получать свои проценты.',
                    this.getSignature()
                ].join('<br><br>')
            },
            this.sendCallback.bind(this)
        );
	},

	/**
	 * Отправка запроса на бесплатный логотип.
	 * @param {String} id ID клиента.
	 */
	sendDrawForMeRequest: function (id) {
		this.getSender().send(
			{
				from: 'robot@xn--h1ailo2b.xn--80asehdb',
				to: 'oleg.pav.m@gmail.com',
				subject: 'Запрос на бесплатный логотип',
				html: 'ID: ' + id
			},
			this.sendCallback.bind(this)
		);
	},

	/**
	 * Уведомляет клиента о том что кто-то оставил ему отзыв.
	 * @param {String} id ID компании.
	 */ 
	notifyClientAboutReview: function (id) {
		this.getSender().send(
			{
				from: 'robot@xn--h1ailo2b.xn--80asehdb',
				to: this.getLogin(),
				subject: 'Новый отзыв!',
				html: [
					'Здравствуйте!',
					'О вашей компании оставлен новый отзыв!',
					'Прочитать его вы можете ' +
					'<a href="http://xn--h1ailo2b.xn--80asehdb/page-company-' + id + '_reviews">на странице вашей компании.</a>',
					this.getSignature()
				].join('<br><br>')
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
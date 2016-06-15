/**
 * Отправляет письмо с авторизационными данными для любого типа аккаунта.
 * Необходимо указать {@link #to}, {@link #login} и {@link #pass}.
 */
Ext.define('B.mail.Pass', {
    extend: 'B.mail.AbstractMail',

    subject: 'Пароль для Фирмы Онлайн',
    tpl:
        'Данные для входа на сайт <a href="http://фирмы.онлайн/">http://фирмы.онлайн</a>' +
        '<br><br>' +
        'Ваш логин: {login}' +
        '<br><br>' +
        'Ваш пароль: {pass}' +
        '<br><br>' +
        'Не сообщайте пароль никому, даже сотруднику компании.' +
        '<br><br>',

    config: {

        /**
         * @cfg {String} login Логин аккаунта.
         */
        login: '',

        /**
         * @cfg {String} pass Пароль аккаунта.
         */
        pass: ''
    },

    init: function () {
        this.callParent(arguments);

        this.setData({
            login: this.getLogin(),
            pass: this.getPass()
        });
    }
});
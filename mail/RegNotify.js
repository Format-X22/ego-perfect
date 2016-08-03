/**
 * Отправляет письмо на почту общей связи в случае любой регистрации кого либо.
 */
Ext.define('B.mail.RegNotify', {
    extend: 'B.mail.AbstractMail',

    to: 'w@firms-online.com',
    subject: 'Регистрация клиента',
    tpl: 'Новая регистрация - {login}',

    config: {

        /**
         * @cfg {String} (reqired) login Логин аккаунта.
         */
        login: ''
    },

    init: function () {
        this.callParent(arguments);

        this.setData({
            login: this.getLogin()
        });
    }
});
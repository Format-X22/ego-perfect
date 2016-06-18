/**
 * Оповещение об использовании клиентом или партнером
 * партнерского ключа при регистрации.
 * Необходимо указать {@link #clientLogin} и {@link #to}.
 */
Ext.define('B.mail.PartnerKeyUsed', {
    extend: 'B.mail.AbstractMail',

    subject: 'Хорошие новости! Кто-то использовал ваш ключ!',
    html:
        'Здравствуйте!' +
        '<br><br>' +
        'Клиент с логином {clientLogin} вопспользовался вашим ключем при регистрации!' +
        '<br><br>' +
        'Теперь от всех его платежей вы будете получать свои проценты.' +
        '<br><br>',

    config: {

        /**
         * @cfg {String} clientLogin (required) Логин клиента.
         */
        clientLogin: ''
    },

    init: function () {
        this.callParent(arguments);

        this.setData({
            clientData: this.getClientLogin()
        });
    }
});
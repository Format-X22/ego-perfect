/**
 * Модуль работы с почтой.
 */
'use strict';

var emailSender = require('sendgrid')('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');

/**
 * Отправляет письмо об успешной регистрации с логином и паролем.
 * @param {Object} config Объект конфигурации.
 * @param {String} config.type Тип аккаунта.
 * @param {String} config.login Логин.
 * @param {String} config.pass Пароль.
 * @param {Function} callback Следующий шаг.
 */
exports.sendAuthMail = function (config, callback) {
    var type = config.type;
    var login = config.login;
    var pass = config.pass;

    if (type === 'company') {
        type = 'Клиент';
    } else if (type === 'partner') {
        type = 'Партнер';
    }

    emailSender.send({
        from: 'robot@xn--h1ailo2b.xn--80asehdb',
        to: login,
        subject: 'Пароль для Фирмы Онлайн',
        text:
            'Данные для входа на сайт фирмы.онлайн\n\r' +
            'Тип аккаунта: ' + type + '\n\r' +
            'Ваш логин: ' + login + '\n\r' +
            'Ваш пароль: ' + pass + '\n\r' +
            'Не сообщайте пароль никому, даже сотруднику Фирмы Онлайн.\n\r'
    }, function (error) {
        return callback(!error);
    });
};
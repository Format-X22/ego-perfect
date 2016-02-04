/**
 * Модуль работы с почтой.
 */
'use strict';

var emailSender = require('sendgrid')('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');

/**
 * Отправляет письмо об успешной регистрации с логином и паролем.
 * @param {String} login Логин.
 * @param {String} pass Пароль.
 * @param {Function} callback Следующий шаг.
 */
exports.sendRegisterMail = function (login, pass, callback) {
    emailSender.send({
        from: 'robot@xn--h1ailo2b.xn--80asehdb',
        to: login,
        subject: 'Пароль для Фирмы Онлайн',
        text:
            'Данные для входа на сайт фирмы.онлайн\n\r' +
            'Ваш логин: ' + login + '\n\r' +
            'Ваш пароль: ' + pass + '\n\r' +
            'Не сообщайте пароль никому, даже сотруднику Фирмы Онлайн.\n\r'
    }, function (error) {
        callback(!error);
    });
};

/**
 * Отправляет письмо об успешной смене пароля, с логином и паролем.
 * @param {String} login Логин.
 * @param {String} pass Пароль.
 * @param {Function} callback Следующий шаг.
 */
exports.sendChangePassMail = function (login, pass, callback) {
    emailSender.send({
        from: 'robot@xn--h1ailo2b.xn--80asehdb',
        to: login,
        subject: 'Пароль для Фирмы Онлайн',
        text:
            'Новые данные для входа на сайт фирмы.онлайн\n\r' +
            'Ваш логин: ' + login + '\n\r' +
            'Ваш пароль: ' + pass + '\n\r' +
            'Для соблюдения безопасности ваших данных рекомендуем ' +
            'выйти и войти на сайт уже с новым паролем.\n\r' +
            'Не сообщайте пароль никому, даже сотруднику Фирмы Онлайн.\n\r'
    }, function (error) {
        callback(!error);
    });
};
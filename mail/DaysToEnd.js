/**
 * Письмо о том что необходимо в скором времени оплатить.
 */
Ext.define('B.mail.DaysToEnd', {
    extend: 'B.mail.WeekReport',

    subject: 'Размещение в Фирмы онлайн подходит к концу',
    tpl:
        'Здравствуйте!' +
        '<br><br>' +
        'На данный момент ваша компания отображается в поиске на сайте ' +
        '<a href="http://firms-online.com">фирмы.онлайн</a><br>' +
        'За время размещения ваши показатели составили:<br>' +
        'Просмотров вашей компании - <b>{views}</b><br>' +
        'Отзывов о вашей компании - <b>{reviews}</b><br>' +
        'Средняя звездность вашей компании - <b>{stars}</b><br>' +
        'Рейтинг вашей компании - <b>{rating}</b><br>' +
        '<br><br>' +
        'Прямая ссылка на вашу компанию - ' +
        '<a href="http://firms-online.com/page-company-{id}">' +
            '{name}' +
        '</a>' +
        '<br><br>' +
        'Однако, через {days} дней ваше размещение подойдет к концу.<br>' +
        'Ваши клиенты больше не увидят вас в поиске.<br>' +
        'Продлить размещение можно в ' +
        '<a href="http://firms-online.com/page-root-login">вашем личном кабинете.</a>' +
        '<br><br>' +
        'При необходимости вы можете позвонить на номер ' +
        '<a href="tel:88002500186">8 (800) 25-00-186</a>' +
        ' и уточнить любые детали.<br>' +
        'Или написать на нашу почту ' +
        '<a href="mailto:w@firms-online.com">w@firms-online.com</a>' +
        '<br><br>',

    config: {

        /**
         * @cfg {Number} days Количество дней до конца.
         */
        days: 0
    },

    init: function () {
        this.callParent(arguments);

        var data = this.getData();

        data.days = this.getDays();

        this.setData(data);
    }
});
/**
 * Письмо с еженедельным отчетом.
 * Требуется заполнить все поля конфигурации.
 */
Ext.define('B.mail.WeekReport', {
    extend: 'B.mail.AbstractMail',

    subject: 'Недельный отчет Фирмы онлайн',
    tpl:
        'Здравствуйте!' +
        '<br><br>' +
        'За последнюю неделю:<br>' +
        'Просмотров вашей компании - <b>{views}</b><br>' +
        'Отзывов о вашей компании - <b>{reviews}</b><br>' +
        'Средняя звездность отзывов за неделю - <b>{stars}</b><br>' +
        'Рейтинг вашей компании увеличился на - <b>{rating}</b><br>' +
        '<br><br>' +
        'Прямая ссылка на вашу компанию - ' +
        '<a href="http://firms-online.com/page-company-{id}">' +
            '{name}' +
        '</a>' +
        '<br><br>' +
        'Услуги оплачены до - <b>{payDate}</b><br>' +
        '<br><br>' +
        'Успехов!' +
        '<br><br>',

    config: {

        /**
         * @cfg {Number} views Просмотры.
         */
        views: 0,

        /**
         * @cfg {Number} reviews Отзывы.
         */
        reviews: 0,

        /**
         * @cfg {Number} stars Звездность.
         */
        stars: 0,

        /**
         * @cfg {Number} rating Рейтинг.
         */
        rating: 0,

        /**
         * @cfg {String} id Идентификатор компании.
         */
        id: '',

        /**
         * @cfg {String} name Имя компании.
         */
        name: '',

        /**
         * @cfg {Date} Дата, до которой оплачены услуги.
         */
        payDate: null
    },

    init: function () {
        this.callParent(arguments);

        this.setData({
            views: this.getViews(),
            reviews: this.getReviews(),
            stars: this.getStars(),
            rating: this.getRating(),
            id: this.getId(),
            name: this.getName(),
            payDate: this.getPayDate()
        });
    }
});
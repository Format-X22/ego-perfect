/**
 * Письмо с еженедельным отчетом.
 */
Ext.define('B.mail.WeekReport', {
    extend: 'B.mail.AbstractMail',

    subject: 'Недельный отчет Фирмы онлайн',
    tpl:
        'Здравствуйте!' +
        '<br><br>' +
        'За последнюю неделю:<br><br>' +
        'Просмотров вашей компании: <b>{views}</b><br>' +
        'Отзывов о вашей компании: <b>{reviews}</b><br>' +
        'Рейтинг вашей компании изменился на <b>+{rating}</b>' +
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
         * @cfg {Date} payDate Дата, до которой оплачены услуги.
         */
        payDate: null,

        /**
         * @cfg {String} login Логин, используется вместо {@link #to} если он отсутствует.
         */
        login: '',

        /**
         * @cfg {String} _id
         * Идентификатор компании, альтернативная конфигурация,
         * используется в случае если не указан {@link #id}.
         */
        _id: ''
    },

    init: function () {
        this.callParent(arguments);

        var to = this.getTo();
        var id = this.getId();
        
        if (!to) {
            this.setTo(this.getLogin());
        }

        if (!id) {
            this.setId(this.get_id());
        }
        
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
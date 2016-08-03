/**
 * Сервис еженедельных отчетов для компании.
 */
Ext.define('B.service.WeekReport', {
    extend: 'B.service.AbstractService',

    requires: [
        'B.mongo.Company',
        'B.mail.WeekReport',
        'B.util.Array'
    ],

    serviceNameForLogger: 'Еженедельные отчеты для компании',

    config: {

        /**
         * @private
         * @cfg {Object[]} data Данные для рассылки.
         */
        data: null
    },

    constructor: function () {
        this.callParent(arguments);

        B.util.Function.queue([
            this.extractDataStep,
            this.prepareDataStep,
            this.sendMailsStep
        ], this);
    },

    privates: {

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        extractDataStep: function (next) {
            var collection = Ext.create('B.mongo.Company').getCollection();
            var now = new Date();
            var commercialStart = Ext.Date.parse('01.06.2016', 'd.m.Y');

            collection.find(
                {
                    payDate: {
                        $gt: now
                    },
                    registerDate: {
                        $gt: commercialStart
                    },
                    name: {
                        $exists: true
                    }
                },
                {
                    _id: true,
                    name: true,
                    rating: true,
                    views: true,
                    reviews: true,
                    statsStack: true,
                    payDate: true,
                    login: true
                }
            ).toArray(function (error, result) {
                if (error) {
                    this.logError('Ошибка получения списка клиентов');
                } else {
                    this.setData(result);
                    next();
                }
            }.bind(this));
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        prepareDataStep: function (next) {
            Ext.each(this.getData(), function (raw) {
                var dump = raw.statsStack || [];
                var slice = dump.slice(-7);

                B.util.Array.padLeft(slice, {
                    rating: 0,
                    views: 0,
                    reviews: [],
                    reviewsCount: 0
                }, 7);

                this.setData({
                    id:      raw._id,
                    name:    raw.name,
                    rating:  this.calculateRating(slice),
                    views:   this.calculateViews(slice),
                    reviews: this.calculateReviewsCount(slice),
                    payDate: Ext.Date.format(raw.payDate, 'd.m.Y'),
                    login:   raw.login
                });
            }, this);

            next();
        },

        /**
         * @private
         * @param {Object[]} slice Срез данных.
         * @return {Number} Значение.
         */
        calculateRating: function (slice) {
            return B.util.Array.diffFiniteProperties(slice, 'rating');
        },

        /**
         * @private
         * @param {Object[]} slice Срез данных.
         * @return {Number} Значение.
         */
        calculateViews: function (slice) {
            return B.util.Array.diffFiniteProperties(slice, 'views');
        },

        /**
         * @private
         * @param {Object[]} slice Срез данных.
         * @return {Number} Значение.
         */
        calculateReviewsCount: function (slice) {
            return B.util.Array.diffFiniteProperties(slice, 'reviewsCount');
        },

        /**
         * @private
         */
        sendMailsStep: function () {
            Ext.each(this.getData(), function (company) {
                var login = company.login;

                Ext.create('B.mail.WeekReport', Ext.apply(company, {
                    to: login,
                    scope: this,
                    failure: function () {
                        this.logError('Не удалось отправить сообщение клиенту ' + login);
                    }
                }));
            }, this);
        }
    }
});
/**
 * Сервис для генерации отчетов для клиентов.
 * Работает обрабатывая компанию за компанией по очереди,
 * не выгружая сразу все компании,
 * экономит память, но существенно увеличивает время обработки.
 */
Ext.define('B.service.ClientStat', {
    extend: 'B.service.AbstractStat',

    serviceNameForLogger: 'Отчеты для клиентов',

    config: {

        /**
         * @private
         * @cfg {Object[]} ratingStat Статистика рейтинга.
         */
        ratingStat: null,

        /**
         * @private
         * @cfg {Object[]} viewsStat Статистика просмотров.
         */
        viewsStat: null,

        /**
         * @private
         * @cfg {Object[]} reviewsStat Статистика отзывов.
         */
        reviewsStat: null,

        /**
         * @private
         * @cfg {Object[]} starsStat Статистика звездности.
         */
        starsStat: null,

        /**
         * @private
         * @cfg {Number} rating Значение рейтинга.
         */
        rating: null,

        /**
         * @private
         * @cfg {Number} view Количество просмотров
         */
        views: null,

        /**
         * @private
         * @cfg {Object[]} reviews Массив отзывов.
         */
        reviews: null
    },

    /**
     * @inheritdoc
     * @localdoc Фильтр оставляет только активные компании.
     */
    getEntityFilter: function () {
        return {
            payDate: {
                $gt: new Date()
            }
        }
    },
    
    /**
     * @inheritdoc
     */
    extractStatStep: function (next) {
        var id = this.getCurrentId();

        B.Mongo.getCollection('company').findOne(
            {
                _id: id
            },
            {
                _id: false,
                ratingStat: true,
                viewsStat: true,
                reviewsStat: true,
                starsStat: true,
                rating: true,
                views: true,
                reviews: true
            },
            function (error, result) {
                if (error) {
                    this.logError('Ошибка при получении статистики для ' + id);
                } else {
                    this.setStatData(result);
                    next();
                }
            }.bind(this)
        );
    },

    /**
     * @inheritdoc
     */
    setStatData: function (data) {
        this.setRatingStat(  data.ratingStat  || []);
        this.setViewsStat(   data.viewsStat   || []);
        this.setReviewsStat( data.reviewsStat || []);
        this.setStarsStat(   data.starsStat   || []);
        this.setRating(      data.rating      || 0 );
        this.setViews(       data.views       || 0 );
        this.setReviews(     data.reviews     || []);
    },

    /**
     * @inheritdoc
     */
    padStatIfNeedStep: function (next) {
        var data = [
            this.getRatingStat(),
            this.getViewsStat(),
            this.getReviewsStat(),
            this.getStarsStat()
        ];

        data = Ext.Array.map(data, function (stat) {
            if (stat.length) {
                return stat;
            } else {
                return this.padStat();
            }
        }, this);

        this.setRatingStat(data[0]);
        this.setViewsStat(data[1]);
        this.setReviewsStat(data[2]);
        this.setStarsStat(data[3]);

        next();
    },

    /**
     * @inheritdoc
     */
    modifyStatStep: function (next) {
        var monthArray = this.getMonthArray();
        var monthIndex = this.getCurrentMonthIndex();
        var currentMonthName = monthArray[monthIndex];
        var stats = [
            this.getRatingStat(),
            this.getViewsStat(),
            this.getReviewsStat(),
            this.getStarsStat()
        ];

        this.actualizeMonthLine(stats, currentMonthName);
        this.modifyRatingStat();
        this.modifyViewsStat();
        this.modifyReviewsStat();
        this.modifyStarsStat();

        next();
    },

    /**
     * @inheritdoc
     */
    updateStatStep: function (next) {
        var id = this.getCurrentId();

        B.Mongo.getCollection('company').updateOne(
            {
                _id: id
            },
            {
                $set: {
                    ratingStat: this.getRatingStat(),
                    viewsStat: this.getViewsStat(),
                    reviewsStat: this.getReviewsStat(),
                    starsStat: this.getStarsStat()
                }
            },
            function (error) {
                if (error) {
                    this.logError('Ошибка сохранения статистики.');
                } else {
                    next();
                }
            }.bind(this)
        );
    },

    privates: {

        /**
         * @private
         */
        modifyRatingStat: function () {
            var stat = this.getRatingStat();
            var rating = this.getRating();
            var lastIndex = stat.length - 1;

            stat[lastIndex].value = rating;
        },

        /**
         * @private
         */
        modifyViewsStat: function () {
            var stat = this.getViewsStat();
            var views = this.getViews();
            var lastIndex = stat.length - 1;

            stat[lastIndex].value = views;
        },

        /**
         * @private
         */
        modifyReviewsStat: function () {
            var stat = this.getReviewsStat();
            var reviews = this.getReviews();
            var lastIndex = stat.length - 1;

            stat[lastIndex].value = reviews.length;
        },

        /**
         * @private
         */
        modifyStarsStat: function () {
            var stat = this.getStarsStat();
            var reviews = this.getReviews();
            var ratingArray = Ext.Array.pluck(reviews, 'rating');
            var sum = Ext.Array.sum(ratingArray);
            var stars = (sum / reviews.length) || 0;
            var rounded = stars.toFixed(2);
            var lastIndex = stat.length - 1;

            stat[lastIndex].value = Number(rounded);
        }
    }
});
/**
 * Сервис для оповещений о том что скоро конец оплаченного периода.
 */
Ext.define('B.service.EndNotify', {
    extend: 'B.service.AbstractService',

    requires: [
        'B.mongo.Company',
        'B.mail.EndNow',
        'B.mail.DaysToEnd',
        'B.util.Array'
    ],

    serviceNameForLogger: 'Еженедельные отчеты для компании',

    config: {

        /**
         * @private
         * @cfg {Object} collection Указатель на mongo-коллекцию.
         */
        collection: null,

        /**
         * @private
         * @cfg {Date} commercialStart Дата начала коммерческих продаж.
         */
        commercialStart: null,

        /**
         * @private
         * @cfg {Object} projection Конфигурация проекции данных.
         */
        projection: null,

        /**
         * @private
         * @cfg {Object[]} overdue Набор данных просроченных.
         */
        overdue: null,

        /**
         * @private
         * @cfg {Object[]} edge Набор данных тех кто на грани просрочки.
         */
        edge: null
    },

    constructor: function () {
        this.callParent(arguments);

        this.setCollection(
            Ext.create('B.mongo.Company').getCollection()
        );
        this.setCommercialStart(
            Ext.Date.parse('01.06.2016', 'd.m.Y')
        );

        this.setProjection({
            _id: true,
            name: true,
            rating: true,
            views: true,
            reviews: true,
            payDate: true,
            login: true
        });

        B.util.Function.queue([
            this.extractOverdueStep,
            this.notifyOverdueStep,
            this.extractEdgeStep,
            this.notifyEdgeStep
        ], this);
    },

    privates: {
        
        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        extractOverdueStep: function (next) {
            this.find(
                {
                    payDate: {
                        $lt: this.getDay(-1),
                        $gt: this.getDay(-2)
                    },
                    registerDate: {
                        $gt: this.getCommercialStart()
                    },
                    name: {
                        $exists: true
                    }
                },
                function (data) {
                    this.setOverdue(data);
                    next();
                },
                'Ошибка получения списка клиентов просрочивших платеж'
            );
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        notifyOverdueStep: function (next) {
            Ext.each(this.getOverdue(), function (company) {
                Ext.create('B.mail.EndNow', company);
            });
            next();
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        extractEdgeStep: function (next) {
            this.find(
                {
                    payDate: {
                        $lt: this.getDay(6),
                        $gt: this.getDay(3)
                    },
                    registerDate: {
                        $gt: this.getCommercialStart()
                    },
                    name: {
                        $exists: true
                    }
                },
                function (data) {
                    this.setEdge(data);
                    next();
                },
                'Ошибка получения списка клиентов близких к просрочке'
            );
        },

        /**
         * @private
         */
        notifyEdgeStep: function () {
            Ext.each(this.getEdge(), function (company) {
                Ext.create('B.mail.DaysToEnd', company);
            });
        },

        /**
         * @private
         * @param {Object} query Объект запроса.
         * @param {Function} callback Колбек, принимающий первым аргументом данные.
         * @param {String} errorText Текст ошибки для лога в случае ошибки.
         */
        find: function (query, callback, errorText) {
            this.getCollection().find(
                query,
                this.getProjection()
            ).toArray(function (error, data) {
                if (error) {
                    this.logError(errorText);
                } else {
                    callback.call(this, data);
                }
            }.bind(this));
        },

        /**
         * @private
         * @param {Number} num На столько дней больше чем сейчас.
         * @return {Date} Получившеяся дата.
         */
        getDay: function (num) {
            return Ext.Date.add(new Date(), Ext.Date.DAY, num);
        }
    }
});
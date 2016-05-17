/**
 * Сервис для оплаты одной компании в ручную.
 */
Ext.define('B.service.PayOne', {
    extend: 'B.service.AbstractService',

    serviceNameForLogger: 'Оплата одной компании в ручную',

    config: {

        /**
         * @cfg {String} id ID компании.
         */
        id: null,

        /**
         * @cfg {String} monthCount Количество месяцев оплаты.
         */
        monthCount: null,

        /**
         * @private
         * @cfg {Object} mongoId Mongo ObjectID.
         */
        mongoId: null,

        /**
         * @private
         * @cfg {String} login Логин компании.
         */
        login: null,

        /**
         * @private
         * @cfg {Date} currentPayDate Текущая дата оплаты.
         */
        currentPayDate: null
    },

    constructor: function () {
        this.callParent(arguments);

        var id = this.getId();
        var mongoId = B.Mongo.makeId(id);

        this.setMongoId(mongoId);

        B.util.Function.queue([
            this.findStep,
            this.updateStep,
            this.releaseStep
        ], this);
    },

    privates: {

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        findStep: function (next) {
            B.Mongo.getCollection('company').findOne(
                {
                    _id: this.getMongoId()
                },
                function (error, doc) {
                    if (error) {
                        this.logError('Ошибка поиска компании');
                        return;
                    }

                    if (doc) {
                        this.setLogin(doc.login);
                        this.setCurrentPayDate(doc.payDate);
                        next();
                    } else {
                        this.logError('Компания не найдена');
                    }
                }.bind(this)
            );
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        updateStep: function (next) {
            B.Mongo.getCollection('company').updateOne(
                {
                    _id: this.getMongoId()
                },
                {
                    $set: {
                        payDate: this.getNewPayDate()
                    }
                },
                function (error, resultObj) {
                    if (error) {
                        this.logError('Ошибка обновления компании');
                        return;
                    }

                    if (resultObj.result.nModified) {
                        next();
                    } else {
                        this.logError('Компания не найдена на шаге обновления');
                    }
                }.bind(this)
            );
        },

        /**
         * @private
         * @return {Date} Новая дата оплаты.
         */
        getNewPayDate: function () {
            var monthCount = this.getMonthCount();
            var currentDate = this.getCurrentPayDate() || new Date();

            return Ext.Date.add(currentDate, Ext.Date.MONTH, monthCount);
        },

        /**
         * @private
         */
        releaseStep: function () {
            Ext.create('B.biz.client.Release', {
                isDirectMode: true,
                directLogin: this.getLogin(),
                directErrorCallback: this.logError,
                directErrorCallbackScope: this
            });
        }
    }
});
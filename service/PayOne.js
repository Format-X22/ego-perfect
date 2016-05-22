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
         * @cfg {String} month Количество месяцев оплаты, алиас к {@link #monthCount}.
         */
        month: null,

        /**
         * @cfg {Number} percent Процент вознаграждения партнера.
         */
        percent: 40,

        /**
         * @cfg {Number} percent Процент вознаграждения партнера второго уровня.
         */
        subPercent: 10,

        /**
         * @private
         * @cfg {Object} mongoId Mongo ObjectID.
         */
        mongoId: null,

        /**
         * @private
         * @cfg {String} name Имя компании.
         */
        name: null,

        /**
         * @private
         * @cfg {String} login Логин компании.
         */
        login: null,

        /**
         * @private
         * @cfg {Object} partnerId ID партнера.
         */
        partnerKey: null,

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
        var monthAlias = this.getMonth();

        this.setMongoId(mongoId);

        if (monthAlias) {
            this.setMonthCount(monthAlias);
        }

        B.util.Function.queue([
            this.findCompanyStep,
            this.updateCompanyStep,
            this.releaseStep,
            this.updatePartner,
            this.updatePartnersPartner
        ], this);
    },

    privates: {

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        findCompanyStep: function (next) {
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
                        this.setName(doc.name);
                        this.setLogin(doc.login);
                        this.setPartnerKey(doc.partnerKey);
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
        updateCompanyStep: function (next) {
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

                    if (this.isAnyUpdates(resultObj)) {
                        next();
                    } else {
                        this.logError('Нечего обновлять');
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
         * @param {Function} next Следующий шаг.
         */
        releaseStep: function (next) {
            Ext.create('B.biz.client.Release', {
                isDirectMode: true,
                directLogin: this.getLogin(),
                directCallback: next,
                directCallbackScope: this,
                directErrorCallback: this.logError,
                directErrorCallbackScope: this
            });
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        updatePartner: function (next) {
            var actsData = this.makeActsData(false);

            B.Mongo.getCollection('partner').updateOne(
                {
                    _id: B.Mongo.safeMakeId(this.getPartnerKey())
                },
                {
                    $inc: {
                        reservedMoneyCount: actsData.percent
                    },
                    $push: {
                        actsData: actsData
                    }
                },
                function (error, resultObj) {

                    if (error) {
                        this.logError('Ошибка обновления данных партнера');
                    }

                    if (this.isAnyUpdates(resultObj)) {
                        next();
                    }
                }.bind(this)
            );
        },

        /**
         * @private
         */
        updatePartnersPartner: function () {
            var actsData = this.makeActsData(true);

            B.Mongo.getCollection('partner').updateOne(
                {
                    partners: B.Mongo.safeMakeId(this.getPartnerKey())
                },
                {
                    $inc: {
                        reservedMoneyCount: actsData.percent
                    },
                    $push: {
                        actsData: actsData
                    }
                },
                function (error) {
                    if (error) {
                        this.logError('Ошибка обновления данных партнера второго уровня');
                    }
                }.bind(this)
            );
        },

        /**
         * @private
         * @params {Boolean} sub Если true считать партнера партнером второго уровня.
         * @return {Object} Объект с данными акта.
         */
        makeActsData: function (sub) {
            var month = this.getMonthCount();
            var count = month * 2190;
            var percent;
            var percentAsMoney;

            if (sub) {
                percent = this.getSubPercent();
            } else {
                percent = this.getPercent();
            }

            percentAsMoney = count / 100 * percent;

            return {
                name: this.getName(),
                login: this.getLogin(),
                count: count,
                date: new Date(),
                percent: percentAsMoney,
                done: false
            };
        },

        /**
         * @private
         * @param {Object} result Объект результата запроса.
         * @return {Boolean} Результат проверки.
         */
        isAnyUpdates: function (result) {
            return Boolean(result.result.nModified);
        }
    }
});
/**
 * Сервис для генерации отчетов для партнеров.
 * Работает обрабатывая партнера за партнером по очереди,
 * не выгружая сразу все компании,
 * экономит память, но существенно увеличивает время обработки.
 */
Ext.define('B.service.PartnerStat', {
    extend: 'B.service.AbstractStat',

    serviceNameForLogger: 'Отчеты для партнеров',

    dbCollectionName: 'partner',
    
    config: {

        /**
         * @private
         * @cfg {Object[]} clientsStat Статистика по клиентам.
         */
        clientsStat: null,

        /**
         * @private
         * @cfg {Object[]} partnersStat Статистика по партнерам.
         */
        partnersStat: null,

        /**
         * @private
         * @cfg {Object[]} moneyStat Статистика доходности.
         */
        moneyStat: null,

        /**
         * @private
         * @cfg {Object[]} totalStat Общая статистика.
         */
        totalStat: null,

        /**
         * @private
         * @cfg {String[]} clients Клиенты в виде массива айдишников.
         */
        clients: null,

        /**
         * @private
         * @cfg {String[]} partners Партнеры в виде массива айдишников.
         */
        partners: null,

        /**
         * @private
         * @cfg {Number} clientsMoney Заработано денег на клиентах.
         */
        clientsMoney: null,

        /**
         * @private
         * @cfg {Number} partnersMoney Заработано денег на партнерах.
         */
        partnersMoney: null
    },

    /**
     * @inheritdoc
     */
    extractStatStep: function (next) {
        var id = this.getCurrentId();

        B.Mongo.getCollection(this.getDbCollectionName()).findOne(
            {
                _id: id
            },
            {
                _id: false,
                clientsStat: true,
                partnersStat: true,
                moneyStat: true,
                totalStat: true,
                clients: true,
                partners: true,
                clientsMoney: true,
                partnersMoney: true
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
        this.setClientsStat(   data.clientsStat   || []);
        this.setPartnersStat(  data.partnersStat  || []);
        this.setMoneyStat(     data.moneyStat     || []);
        this.setTotalStat(     data.totalStat     || []);
        this.setClients(       data.clients       || []);
        this.setPartners(      data.partners      || []);
        this.setClientsMoney(  data.clientsMoney  || 0 );
        this.setPartnersMoney( data.partnersMoney || 0 );
    },

    /**
     * @inheritdoc
     */
    padStatIfNeedStep: function (next) {
        var data = [
            this.getClientsStat(),
            this.getPartnersStat(),
            this.getMoneyStat()
        ];

        data = Ext.Array.map(data, function (stat) {
            if (stat.length) {
                return stat;
            } else {
                return this.padStat();
            }
        }, this);

        this.setClientsStat(data[0]);
        this.setPartnersStat(data[1]);
        this.setMoneyStat(data[2]);

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
            this.getClientsStat(),
            this.getPartnersStat(),
            this.getMoneyStat()
        ];

        this.actualizeMonthLine(stats, currentMonthName);
        this.modifyClientsStat();
        this.modifyPartnersStat();
        this.modifyMoneyStat();
        this.modifyTotalStat();

        next();
    },

    /**
     * @inheritdoc
     */
    updateStatStep: function (next) {
        var id = this.getCurrentId();

        B.Mongo.getCollection(this.getDbCollectionName()).updateOne(
            {
                _id: id
            },
            {
                $set: {
                    clientsStat: this.getClientsStat(),
                    partnersStat: this.getPartnersStat(),
                    moneyStat: this.getMoneyStat(),
                    totalStat: this.getTotalStat()
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
        modifyClientsStat: function () {
            var stat = this.getClientsStat();
            var clients = this.getClients();
            var lastIndex = stat.length - 1;

            stat[lastIndex].value = clients.length;
        },

        /**
         * @private
         */
        modifyPartnersStat: function () {
            var stat = this.getPartnersStat();
            var partners = this.getPartners();
            var lastIndex = stat.length - 1;

            stat[lastIndex].value = partners.length;
        },

        /**
         * @private
         */
        modifyMoneyStat: function () {
            var stat = this.getMoneyStat();
            var money = this.getClientsMoney() + this.getPartnersMoney();
            var lastIndex = stat.length - 1;

            stat[lastIndex].value = money;
        },

        /**
         * @private
         */
        modifyTotalStat: function () {
            this.setTotalStat([
                {
                    name: 'Клиенты',
                    count: this.getClients().length,
                    money: this.getClientsMoney()
                },
                {
                    name: 'Партнеры',
                    count: this.getPartners().length,
                    money: this.getPartnersMoney()
                }
            ])
        }
    }
});
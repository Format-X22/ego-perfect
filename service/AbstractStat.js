/**
 * Абстрактный сервис для генерации отчетов статистики.
 */
Ext.define('B.service.AbstractStat', {
    extend: 'B.service.AbstractService',
    
    requires: [
        'B.util.Function'
    ],

    config: {

        /**
         * @protected
         * @cfg {Object[]} rawIds Массив сырых айдишников документов.
         */
        rawIds: null,

        /**
         * @protected
         * @cfg {Object[]} ids Массив айдишников документов в виде объектов MongoID.
         */
        ids: null,

        /**
         * @protected
         * @cfg {Object} currentId Текущее id в виде MongoID.
         */
        currentId: null
    },

    constructor: function () {
        this.callParent(arguments);

        B.util.Function.queue([
            this.extractIdsStep,
            this.convertIdsStep,
            this.updateStep
        ], this);
    },

    /**
     * @protected
     * Выгружает сырые айдишники всех сущностей.
     * @param {Function} next Следующий шаг.
     */
    extractIdsStep: function (next) {
        B.Mongo.getCollection('company').find(
            this.getEntityFilter(),
            {
                _id: true
            }
        ).toArray(function (error, result) {
            if (error) {
                this.logError('Ошибка получения списка всех компаний.');
            } else {
                this.setRawIds(result);
                next();
            }
        }.bind(this));
    },

    /**
     * @protected
     * @template
     * @return {Object} Фильтр сущностей.
     */
    getEntityFilter: function () {
        return {};
    },

    /**
     * @protected
     * Конвертирует айдишники компаний в айдишники в виде объектов MongoID.
     * @param {Function} next Следующий шаг.
     */
    convertIdsStep: function (next) {
        var raw = this.getRawIds();
        var flat = Ext.Array.pluck(raw, '_id');
        var mongoIds = Ext.Array.map(flat, function (id) {
            return B.Mongo.makeId(id);
        });

        this.setIds(mongoIds);
        next();
    },

    /**
     * @protected
     * Обновляет данные компаний.
     * Запускает длинную очередь исполнения, обрабатывая каждую компанию шаг за шагом.
     * Это экономит память, но увеличивает время исполнения.
     */
    updateStep: function () {
        var ids = this.getIds();
        var updateQueue = [];

        Ext.each(ids, function () {
            updateQueue.push(
                this.updateCurrentIdStep,
                this.extractStatStep,
                this.padStatIfNeedStep,
                this.modifyStatStep,
                this.updateStatStep
            );
        }, this);

        B.util.Function.queue(updateQueue, this);
    },

    /**
     * @protected
     * Устанавливает id текущей обрабатываемой сущности.
     * @param {Function} next Следующий шаг.
     */
    updateCurrentIdStep: function (next) {
        this.setCurrentId(this.getIds().pop());
        next();
    },

    /**
     * @protected
     * @method extractStatStep
     * Выгружает данные статистики и вспомогательные данные текущей сущности.
     * @param {Function} next Следующий шаг.
     */
    extractStatStep: Ext.emptyFn,

    /**
     * @protected
     * @method setStatData
     * Сохраняет в локальной памяти данные статистики.
     * Предполагается что будет вызван во время выполнения {@link #extractStatStep}.
     * @param {Object} data Набор данных сущности.
     */
    setStatData: Ext.emptyFn,

    /**
     * @protected
     * @method padStatIfNeedStep
     * Заполняет данные статистики пустым набором данных если это нужно.
     * Необходимо для того чтобы статистика всегда была на 12 месяцев.
     * @param {Function} next Следующий шаг.
     */
    padStatIfNeedStep: Ext.emptyFn,

    /**
     * @protected
     * Возращает пустой набор данных по каждому месяцу.
     * Набор является статистикой за 12 месяцев с нулевыми значениями.
     * @return {Object[]} Пустая статистика.
     */
    padStat: function () {
        var monthArray = this.getMonthArray();
        var monthIndex = this.getCurrentMonthIndex() + 1;
        var counter = 0;
        var stat = [];

        for (; counter < 12; counter++) {
            if (monthIndex > 11) {
                monthIndex = 0;
            }

            stat.push(
                {
                    date: monthArray[monthIndex++],
                    value: 0
                }
            );
        }

        return stat;
    },

    /**
     * @protected
     * @return {String[]} Массив имен месяцев.
     */
    getMonthArray: function () {
        return ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    },

    /**
     * @protected
     * @return {Number} Номер текущего месяца.
     */
    getCurrentMonthIndex: function () {
        return new Date().getUTCMonth();
    },

    /**
     * @protected
     * @method modifyStatStep
     * Обрабатывает все данные статистики, добавляя новые данные.
     * @param {Function} next Следующий шаг.
     */
    modifyStatStep: Ext.emptyFn,

    /**
     * @protected
     * Актуализирует линейку месяцев, выставляя первым текущий месяц и удаляя самый старый месяц.
     * @param {Array[]} stats Массив массивов статистики, актуализирует каждый.
     * @param {String} currentMonthName Имя текущего месяца.
     */
    actualizeMonthLine: function (stats, currentMonthName) {
        Ext.Array.each(stats, function (stat) {
            var currentInStat = stat[stat.length - 1].date;
            var nextMonth = this.getNextMonthName(currentInStat);

            if (currentInStat !== currentMonthName) {
                stat.shift();
                stat.push({
                    date: nextMonth,
                    value: 0
                });
            }
        }, this);
    },

    /**
     * @protected
     * @param {String} month Имя текущего месяца.
     * @return {String} Имя следующего месяца.
     */
    getNextMonthName: function (month) {
        var monthArray = this.getMonthArray();
        var index = Ext.Array.indexOf(monthArray, month);
        var nextMonth = monthArray[index + 1];

        if (!nextMonth) {
            nextMonth = monthArray[0];
        }

        return nextMonth;

    },

    /**
     * @protected
     * @method updateStatStep
     * Сохраняет данные статистики в базу.
     * @param {Function} next Следующий шаг.
     */
    updateStatStep: Ext.emptyFn
});
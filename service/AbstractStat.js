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
         * @cfg {String} serviceNameForLogger Имя сервиса для читаемого логирования.
         */
        serviceNameForLogger: '',

        /**
         * @private
         * @cfg {Object[]} extractedData Вынутые данные.
         */
        extractedData: null
    },

    constructor: function (config) {
        this.callParent(arguments);

        B.util.Function.queue([
            this.extractData,
            this.updateEach
        ], this);
    },

    /**
     * @protected
     * @template
     * @method extractData
     * Экстрактор данных отчета.
     * Должна сохранить вынутые данные в {@link #cfg-extractedData}
     * и вызвать калбек next для продолжения.
     * @param {Function} next Следующий шаг.
     */
    extractData: Ext.emptyFn,

    /**
     * @protected
     * @template
     * @method update
     * Метод обновления данных.
     * Получает на вход обработанный документ,
     * и обновляет соответствующий документ в базе
     * обновленными данными отчета.
     * @param {Object} document Обработанный документ.
     */
    update: Ext.emptyFn,

    privates: {

        /**
         * @private
         */
        updateEach: function () {
            Ext.each(this.getExtractedData(), this.update, this);
        }
    }
});
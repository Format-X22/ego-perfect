/**
 * Абстрактный сервис для генерации отчетов статистики.
 */
Ext.define('B.service.AbstractStat', {

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
        Ext.apply(this.config, config);
        this.initConfig(this.config);

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

    /**
     * @protected
     * Логирует ошибку в процессе формирования отчета.
     * @param {Object/String} error Ошибка.
     */
    logError: function (error) {
        var tpl = 'Не удается выполнить сервис "{name}" - {error}';
        var compiled = new Ext.Template(tpl).apply({
            name: this.getServiceNameForLogger(),
            error: error
        });

        Ext.Logger.error(compiled);
    },

    privates: {

        /**
         * @private
         */
        updateEach: function () {
            Ext.each(this.getExtractedData(), this.update, this);
        }
    }
});
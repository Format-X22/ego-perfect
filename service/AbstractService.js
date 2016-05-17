/**
 * Абстрактный сервис.
 */
Ext.define('B.service.AbstractService', {

    config: {

        /**
         * @cfg {String} serviceNameForLogger Имя сервиса для читаемого логирования.
         */
        serviceNameForLogger: ''
    },
    
    constructor: function (config) {
        this.initConfig(
            Ext.apply(
                Ext.clone(this.config),
                config
            )
        );
    },
    
    /**
     * @protected
     * Логирует ошибку сервиса.
     * @param {Object/String} error Ошибка.
     */
    logError: function (error) {
        var tpl = 'Не удается выполнить сервис "{name}" - {error}';
        var compiled = new Ext.Template(tpl).apply({
            name: this.getServiceNameForLogger(),
            error: error
        });

        Ext.Logger.warn(compiled);
    }
});
/**
 * Абстрактный сервис.
 */
Ext.define('B.service.AbstractService', {
    
    constructor: function (config) {
        Ext.apply(this.config, config);
        this.initConfig(this.config);
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

        Ext.Logger.error(compiled);
    }
});
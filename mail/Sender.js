/**
 * Драйвер для отправки почты.
 */
Ext.define('B.mail.Sender', {
    singleton: true,

    config: {
        
        /**
         * @private
         * @cfg {Object} sender Отправщик писем.
         */
        sender: require('sendgrid')(outerResourcesConfig.sendGrid.apiKey)
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
     * Отправляет письмо используя входящий конфиг.
     * @param {Object} config Конфиг.
     * @param {Function} callback Колбек с результатом.
     */
    send: function (config, callback) {
        this.getSender().send(config, callback);    
    }
});
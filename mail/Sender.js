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
    
    send: function (config, callback) {
        
    }
});
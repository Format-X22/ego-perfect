/**
 * Абстрактный обработчик запросов.
 * Хранит Express объекты запроса и ответа.
 * Автоматически создает Protocol для ответа.
 */
Ext.define('B.AbstractRequestHandler', {

    config: {

        /**
         * @cfg {Object} expressRequest Express объект запроса.
         */
        expressRequest: null,

        /**
         * @cfg {Object} expressResponse Express объект ответа.
         */
        expressResponse: null,

        /**
         * @cfg {B.Protocol} protocol Объект протокола.
         */
        protocol: null
    },

    constructor: function (config) {
        Ext.apply(this.config, config);
        this.initConfig(this.config);

        this.setProtocol(Ext.create('B.Protocol', {
            expressResponse: this.getExpressResponse()
        }));
    }
});
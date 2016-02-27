Ext.define('B.MainRouter', {

    config: {
        callback: null
    },

    constructor: function (config) {
        Ext.apply(this.config, config);
        this.initConfig(this.config);
        this.getCallback()();
    }
});
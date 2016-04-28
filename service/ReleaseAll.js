/**
 * Утилита для ручного запуска релиза всего.
 */
Ext.define('B.service.ReleaseAll', {
    extend: 'B.service.AbstractService',

    serviceNameForLogger: 'Релиз всего',

    constructor: function () {
        this.callParent(arguments);

        B.Mongo.getCollection('company').find({
            payDate: {
                $gt: new Date()
            }
        }).toArray(function (error, data) {
            Ext.Array.each(data, function (doc) {
                
                Ext.create('B.biz.client.Release', {
                    isDirectMode: true,
                    directLogin: doc.login
                });
            }, this);
        });
    }
});
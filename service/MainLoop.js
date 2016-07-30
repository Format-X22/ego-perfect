/**
 * Цикл ожидания запуска сервисов в назначенное время.
 * Централизованно хранит и сам план запусков.
 */
Ext.define('B.service.MainLoop', {
    singleton: true,

    requires: [
        'B.service.ClientStat',
        'B.service.PartnerStat',
        'B.service.SearchCleaner',
        'B.service.RatingUpdater',
        'B.service.ReleaseAll',
        'B.service.KeyGen',
        'B.service.PayOne',
        'B.service.TotalPayDateChange',
        'B.service.SiteMapGenerator',
        'B.service.ViewUp',
        'B.service.WeekReport'
    ],

    constructor: function () {
        Ext.defer(function () {
            Ext.create('B.service.ClientStat');
            Ext.create('B.service.ViewUp');
            Ext.create('B.service.WeekReport');
            // Место для установки ручных сервисов
        }, 5000);

        Ext.defer(function () {
            Ext.create('B.service.ClientStat');
            Ext.create('B.service.ViewUp');
            Ext.create('B.service.WeekReport');
            // Место для установки ручных сервисов
        }, 10000);

        Ext.defer(function () {
            Ext.create('B.service.ClientStat');
            Ext.create('B.service.ViewUp');
            Ext.create('B.service.WeekReport');
            // Место для установки ручных сервисов
        }, 15000);

        Ext.defer(function () {
            Ext.create('B.service.ClientStat');
            Ext.create('B.service.ViewUp');
            Ext.create('B.service.WeekReport');
            // Место для установки ручных сервисов
        }, 20000);

        Ext.defer(function () {
            Ext.create('B.service.ClientStat');
            Ext.create('B.service.ViewUp');
            Ext.create('B.service.WeekReport');
            // Место для установки ручных сервисов
        }, 25000);

        Ext.defer(function () {
            Ext.create('B.service.ClientStat');
            Ext.create('B.service.ViewUp');
            Ext.create('B.service.WeekReport');
            // Место для установки ручных сервисов
        }, 30000);

        Ext.defer(function () {
            Ext.create('B.service.ClientStat');
            Ext.create('B.service.ViewUp');
            Ext.create('B.service.WeekReport');
            // Место для установки ручных сервисов
        }, 35000);

        Ext.defer(function () {
            Ext.create('B.service.ClientStat');
            Ext.create('B.service.ViewUp');
            Ext.create('B.service.WeekReport');
            // Место для установки ручных сервисов
        }, 40000);

        setInterval(function () {
            var date = new Date();
            var hour = date.getUTCHours() + 3;

            if (!B.Mongo || !B.Mongo.getCollection('search')) {
                return;
            }

            if (hour === 4) {
                Ext.create('B.service.ClientStat');
                Ext.create('B.service.PartnerStat');
                Ext.create('B.service.SearchCleaner');
                Ext.create('B.service.RatingUpdater');
            }

            if (hour === 5) {
                Ext.create('B.service.SiteMapGenerator');
                Ext.create('B.service.ViewUp');
            }

        }.bind(this), 1000 * 60 * 60);
    }
});
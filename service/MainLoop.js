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
        'B.service.ReleaseAll'
	],

	constructor: function () {
        Ext.defer(function () {
            // Место для установки ручных сервисов
        }, 5000);
        
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

		}.bind(this), 1000 * 60 * 60);
	}
});
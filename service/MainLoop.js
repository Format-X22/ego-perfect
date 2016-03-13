/**
 * Цикл ожидания запуска сервисов в назначенное время.
 * Централизованно хранит и сам план запусков.
 */
Ext.define('B.service.MainLoop', {
	singleton: true,

	requires: [
		'B.service.ClientStat',
		'B.service.PartnerStat',
		'B.service.SearchCleaner'
	],

	constructor: function () {
		//
	}
});
/**
 * Сервис для ежедневного удаления не оплативших компаний.
 */
Ext.define('B.service.SearchCleaner', {

	constructor: function () {
		var collection = B.Mongo.getCollection('search');

		if (collection) {
			collection.deleteMany(
				{
					payDate: {
						$lt: new Date()
					}
				}
			);
		}
	}
});
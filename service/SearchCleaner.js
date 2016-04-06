/**
 * Сервис для ежедневного удаления не оплативших компаний.
 */
Ext.define('B.service.SearchCleaner', {
    extend: 'B.service.AbstractService',
    
    serviceNameForLogger: 'Удаление лишних компаний',
    
	constructor: function () {
        this.callParent(arguments);
        
		var collection = B.Mongo.getCollection('search');

		if (collection) {
			collection.deleteMany(
				{
					payDate: {
						$lt: new Date()
					}
				},
                function (error) {
                    if (error) {
                        this.logError('Ошибка удаления');
                    }
                }
			);
		}
	}
});
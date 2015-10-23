/**
 * @class dbProvider
 * Провайдер базы данных.
 * Позволяет асинхронно получать доступ к объекту базы данных
 * или к конкретной коллекции.
 */
class dbProvider {
	constructor () {
		this.DB_PATH = 'mongodb://localhost:27017/main';
		this.dbClient = require('mongodb').MongoClient;
	}

	/**
	 * Получение доступа к конкретной коллекции.
	 * @param {Function} callback
	 * Функция, первым параметром которой будет объект доступа к коллекции,
	 * либо false если произошла ошибка.
	 * @param {String} collection Имя коллекции.
	 */
	collection (callback, collection) {
		this.db(function (db) {
			if (db) {
				callback(db.collection(collection));
			} else {
				callback(false);
			}
		});
	}

	/**
	 * Получение доступа к объекту базы данных.
	 * @param {Function} callback
	 * Функция, первым параметром которой будет объект доступа к базе данных,
	 * либо false если произошла ошибка.
	 */
	db (callback) {
		this.dbClient.connect(this.DB_PATH, function (error, db) {
			if (error) {
				console.error('Can not connect!', error);
				callback(false);
			} else {
				callback(db);
			}
		});
	}
}

module.exports = dbProvider;
'use strict';

/**
 * @singleton
 * @class dbCollections
 * Синглтон, позволяющий обращаться к коллекциям базы данных.
 * Имя метода соответствует имени коллекции.
 */
class dbCollections {
	constructor () {
		var provider = new (require('./dbProvider'));

		this.getCollection = provider.collection.bind(provider);
	}

	/**
	 * @param {Function} callback
	 * Функция, первым параметром которой будет объект доступа к коллекции,
	 * либо false если произошла ошибка.
	 */
	search (callback) {
		this.getCollection(callback, 'search');
	}

	/**
	 * @param {Function} callback
	 * Функция, первым параметром которой будет объект доступа к коллекции,
	 * либо false если произошла ошибка.
	 */
	company (callback) {
		this.getCollection(callback, 'company');
	}

	/**
	 * @param {Function} callback
	 * Функция, первым параметром которой будет объект доступа к коллекции,
	 * либо false если произошла ошибка.
	 */
	categories (callback) {
		this.getCollection(callback, 'categories');
	}

	/**
	 * @param {Function} callback
	 * Функция, первым параметром которой будет объект доступа к коллекции,
	 * либо false если произошла ошибка.
	 */
	zones (callback) {
		this.getCollection(callback, 'zones');
	}

	/**
	 * @param {Function} callback
	 * Функция, первым параметром которой будет объект доступа к коллекции,
	 * либо false если произошла ошибка.
	 */
	photo (callback) {
		this.getCollection(callback, 'photo');
	}

	/**
	 * @param {Function} callback
	 * Функция, первым параметром которой будет объект доступа к коллекции,
	 * либо false если произошла ошибка.
	 */
	comments (callback) {
		this.getCollection(callback, 'comments');
	}
}

module.exports = new dbCollections();
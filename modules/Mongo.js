/**
 * Модуль доступа к базе данных.
 */
'use strict';

var Mongo = require('mongodb');
var MongoClient = Mongo.MongoClient;
var dbObject = null;

const DB_PATH = 'mongodb://admin:114430fK@ds031551.mongolab.com:31551/heroku_hfxkwqsw';
const RECONNECT_TIMEOUT = 10 * 1000;

const BASE_OBJECT_UNDEFINED = 'Объект базы не существует!';
const CONNECT_ERROR = 'Невозможно подключиться к базе!';
const CONNECT_ESTABLISHED = 'Соединение с базой данных установлено.';

/**
 * Получение доступа к конкретной коллекции.
 * @param {String} collection Имя коллекции.
 * @return {Object} Объект коллекции.
 */
exports.collection = function (collection) {
    if (dbObject) {
        return dbObject.collection(collection);
    } else {
        console.error(BASE_OBJECT_UNDEFINED);
    }
};

/**
 * Подключение к базе данных.
 * @param {Function} [callback] Следующий шаг.
 */
exports.connect = function (callback) {
    callback = callback || function () {};

    MongoClient.connect(DB_PATH, function (error, db) {
        if (error) {
            console.error(CONNECT_ERROR, error);
            tryReconnect(callback);
        } else {
            dbObject = db;
            console.log(CONNECT_ESTABLISHED);
            return callback();
        }
    });
};

/**
 * Предоставляет возможность поиска по _id документа,
 * необходимо отправить в метод нужный id,
 * полученный результат станет пригоден для поиска.
 */
exports.objectID = Mongo.ObjectID;

/**
 * Попытка переподключения через RECONNECT_TIMEOUT милисекунд.
 * @param {Function} callback Следующий шаг.
 */
function tryReconnect (callback) {
    setTimeout(
        exports.connect.bind(null, callback),
        RECONNECT_TIMEOUT
    );
}
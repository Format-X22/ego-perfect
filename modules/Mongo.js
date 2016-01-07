/**
 * Модуль доступа к базе данных.
 */
'use strict';

var Protocol = require('./Protocol');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var DB_PATH = 'mongodb://admin:114430fK@ds031551.mongolab.com:31551/heroku_hfxkwqsw';
var dbObject = null;

/**
 * Получение доступа к конкретной коллекции.
 * @param {String} collection Имя коллекции.
 * @param {Object} Объект коллекции.
 */
exports.collection = function (collection) {
    if (dbObject) {
        return dbObject.collection(collection);
    } else {
        console.error('Объект базы не существует!');
    }
};

/**
 * Подключение к базе данных.
 */
exports.connect = function () {
    MongoClient.connect(DB_PATH, function (error, db) {
        if (error) {
            console.error('Невозможно подключиться к базе!', error);
        } else {
            dbObject = db;
            console.log('Соединение с базой данных установлено.');
        }
    });
};

/**
 * Прелоставляет возможность поиска по _id документа,
 * необходимо отправить в метод нужный id,
 * полученный результат станет пригоден для поиска.
 */
exports.objectID = ObjectID;
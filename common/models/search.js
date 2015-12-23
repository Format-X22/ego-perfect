'use strict';

/**
 * @singleton
 * Поисковый механизм.
 */
class Search {

    constructor () {
        module.exports = function(searchModel) {
            this.searchModel = searchModel;

            this.registerSearchQueryMethod();
        }.bind(this);
    }

    /**
     * @private
     * Регистрирует поисковый метод для модели поиска.
     */
    registerSearchQueryMethod () {
        this.searchModel.query = this.searchQueryMethod.bind(this);
        this.searchModel.remoteMethod('query', {
            accepts: [
                {arg: 'query', type: 'string'},
                {arg: 'start', type: 'number'},
                {arg: 'limit', type: 'number'}
            ],
            http: {path: '/query', verb: 'get'},
            returns: [
                {arg: 'data',    type: 'array'},
                {arg: 'success', type: 'boolean'}
            ]
        });
    }

    /**
     * @private
     * @param {String} query Строка запроса.
     * @param {Number} start С какого документа начинать.
     * @param {Number} limit Сколько документов вернуть.
     * @param {Function} callback Колбэк для возврата результата.
     */
    searchQueryMethod (query, start, limit, callback) {
        var collection = this.getSearchCollection();
        var fields = {_id: 1};

        if (this.isRequestInvalid(query, start, limit)) {
            this.sendError(callback);
            return;
        }

        collection
            .find(
                this.makeDBQuery(query),
                fields
            )
            .skip(start)
            .limit(limit)
            .toArray(
                this.getSearchResultHandler(callback)
            );
    }

    /**
     * @private
     * @param {String} query Строка запроса.
     * @return {Object} Запрос для базы.
     */
    makeDBQuery (query) {
        if (query) {
            return {
                tags: {
                    $regex: '^' + query
                }
            };
        } else {
            return {};
        }
    }

    /**
     * @private
     * @return {Object} Объект доступа к коллекции.
     */
    getSearchCollection () {
        var db = this.searchModel.app.dataSources.mongo.adapter.db;

        return db.collection('search');
    }

    /**
     * @private
     * @param {Function} callback  Колбэк для возврата результата.
     * @return {Function} Обертка, принимающая перым аргументом ошибку, вторым - результат запроса.
     */
    getSearchResultHandler (callback) {
        return function (error, data) {
            if (error) {
                this.sendError(callback);
            } else {
                this.sendData(callback, data);
            }
        }.bind(this)
    }

    /**
     * @private
     * @param {String} query Строка запроса.
     * @param {Number} start С какого документа начинать.
     * @param {Number} limit Сколько документов вернуть.
     * @return {Boolean} Результат проверки.
     */
    isRequestInvalid (query, start, limit) {
        if (query.length > 300) {
            return true;
        }

        if (start > 1000000) {
            return true;
        }

        if (limit > 100) {
            return true;
        }
    }

    /**
     * @private
     * @param {Function} callback Колбэк для возврата результата.
     */
    sendError (callback) {
        callback(null, [], false);
    }

    /**
     * @private
     * @param {Function} callback Колбэк для возврата результата.
     * @param {Array} data Массив результата поиска.
     */
    sendData (callback, data) {
        callback(null, data, true);
    }
}
new Search();

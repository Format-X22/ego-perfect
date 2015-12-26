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
            .sort({rating: -1})
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
        if (!query) {
            return {};
        }

        var tokens = this.getQueryTokens(query);
        var tokensSearch = tokens.map(this.getSingleTokenSearch);

        return {
            tags: {
                $in: tokensSearch
            }
        };
    }

    /**
     * @private
     * @param {String} query Строка запроса.
     * @return {String[]} Массив токенов.
     */
    getQueryTokens (query) {
        return query
            .trim()                         // Обрезаем всякие пробелы по краям
            .replace(/ +/g, ' ')            // Заменяем повторяющиеся пробелы на 1 пробел
            .replace(/ - /g, '-')           // Схлопываем тире в дефис
            .replace(/ -|- /g, '-')         // И по краям
            .replace(/[,]|[.]|[_]/g, ' ')   // Заменяем точки, запятые и подчеркивания на пробелы
            .replace(/ +/g, ' ')            // Заменяем повторяющиеся пробелы на 1 пробел
            .replace(/ . /g, ' ')           // Убираем однобуквенные слова
            .replace(/^. | .$/g, '')        // И по краям
            .split(' ')                     // Режем на части по пробелу
            .map(this.removeTokenEnds);     // Убираем окончания
    }

    /**
     * @private
     * @param {String} token Токен запроса.
     * @return {String} Токен без окончания.
     */
    removeTokenEnds (token) {
        token = token.trim();                 // Убираем пробельные символы у токена, есть кейсы

        if (token.length < 3) {               // 2 буквы, не бывает окончаний
            return token;
        }

        if (token.length < 6) {              // 3-5 букв, режем однобуквенные окончания
            return token.slice(0, -1);
        }

        if (token.length < 8) {              // 6-7 букв, режем двухбуквенные окончания
            return token.slice(0, -2);
        }

        return token.slice(0, -3);           // 8 и более букв, режем трехбуквенные окончания
    }

    /**
     * @private
     * @param {String} token Токен запроса.
     * @return {RegExp} Регэксп поиска.
     */
    getSingleTokenSearch (token) {
        return new RegExp('^' + token, 'i');
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
        if (query && query.length > 300) {
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

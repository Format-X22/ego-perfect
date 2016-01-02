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
                {arg: 'data',    type: 'array'  },
                {arg: 'success', type: 'boolean'},
                {arg: 'error',   type: 'string' }
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
        if (this.isRequestValid(query, start, limit)) {
            var tokens = this.getQueryTokens(query);

            this.doDBQuery({
                dbQuery: this.makeDBQuery(query, tokens),
                fields: {_id: 1, tags: 1, rating: 1},
                start: start,
                limit: limit,
                tokens: tokens,
                callback: this.getSearchResultHandler(callback)
            });
        } else {
            this.sendError(callback, 'Не валидные параметры запроса!');
        }
    }

    /**
     * @private
     * @param {String} query Строка запроса.
     * @return {String[]} Массив токенов.
     */
    getQueryTokens (query) {
        return query
            .toLowerCase()                  // Приводим к строчным буквам
            .trim()                         // Обрезаем всякие пробелы по краям
            .replace(/ +/g, ' ')            // Заменяем повторяющиеся пробелы на 1 пробел
            .replace(/ - /g, '-')           // Схлопываем тире в дефис
            .replace(/ -|- /g, '-')         // И по краям
            .replace(/[,]|[.]|[_]/g, ' ')   // Заменяем точки, запятые и подчеркивания на пробелы
            .replace(/ +/g, ' ')            // Заменяем повторяющиеся пробелы на 1 пробел
            .replace(/ . /g, ' ')           // Убираем однобуквенные слова
            .replace(/^. | .$/g, '')        // И по краям
            .replace(/ё/g, 'е')             // Меняем "ё" на "е" для фикса вариантов написания
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
     * @param {String} query Строка запроса.
     * @param {Number} start С какого документа начинать.
     * @param {Number} limit Сколько документов вернуть.
     * @return {Boolean} Результат проверки.
     */
    isRequestValid (query, start, limit) {
        if (query && query.length > 300) {
            return false;
        }

        if (start > 1000000) {
            return false;
        }

        if (limit > 100) {
            return false;
        }

        return true;
    }

    /**
     * @private
     * @param {Object} cfg Конфиг.
     * @param {Object} cfg.dbQuery Объект запроса для базы.
     * @param {Object} cfg.fields Необходимые поля.
     * @param {Number} cfg.start Стартовый документ.
     * @param {Number} cfg.limit Количество документов.
     * @param {String[]} cfg.tokens Список токенов запроса пользователя.
     * @param {Function} cfg.callback Следующий шаг.
     */
    doDBQuery (cfg) {
        this.getSearchCollection()
            .find(cfg.dbQuery, cfg.fields)
            .skip(cfg.start)
            .limit(cfg.limit)
            .toArray(
                this.sortOnResult(cfg.tokens, cfg.callback)
            );
    }

    /**
     * @private
     * @param {String[]} tokens Список токенов запроса пользователя.
     * @param {Function} callback Следующий шаг.
     * @return {Function}
     * Функция, принимающая ошибку и массив данных,
     * сортирующая данные для возврата пользователю.
     */
    sortOnResult (tokens, callback) {
        return function (error, data) {
            var notNeedSort = this.isEmptyTokens(tokens);

            if (error || notNeedSort) {
                callback(error, data);
            } else {
                callback(false, this.sortResult(data, tokens));
            }
        }.bind(this);
    }

    /**
     * @private
     * @param {String[]} tokens Список токенов запроса пользователя.
     * @return {Boolean} Пустой ли набор токенов.
     */
    isEmptyTokens (tokens) {
        return tokens[0] === '';
    }

    /**
     * @private
     * @param {Object[]} data Массив результата запроса для сортировки.
     * @param {String[]} tokens Список токенов запроса пользователя.
     * @return {Object[]} Массив отсортированных данных.
     */
    sortResult (data, tokens) {
        return data.sort(function (itemA, itemB) {
            this.applyTokenEqualsCount(itemA, itemB, tokens);

            return this.compareResultItems(itemA, itemB);
        }.bind(this));
    }

    /**
     * @private
     * @param {Object} itemA Первый документ.
     * @param {Object} itemB Второй документ.
     * @return {Number} Предикат сортировки.
     */
    compareResultItems (itemA, itemB) {
        var aCount = itemA.equalsCount;
        var bCount = itemB.equalsCount;
        var aRating = itemA.rating;
        var bRating = itemB.rating;

        if (aCount < bCount) {
            return 1;
        }

        if (aCount > bCount) {
            return -1;
        }

        if (aRating < bRating) {
            return 1;
        }

        if (aRating > bRating) {
            return -1;
        }

        return 0;
    }

    /**
     * @private
     * @param {Object} itemA Первый документ.
     * @param {Object} itemB Второй документ.
     * @param {String[]} tokens Список токенов запроса пользователя.
     */
    applyTokenEqualsCount (itemA, itemB, tokens) {
        if (!itemA.equalsCount) {
            this.setTokenEqualsCount(itemA, tokens);
        }

        if (!itemB.equalsCount) {
            this.setTokenEqualsCount(itemB, tokens);
        }
    }

    /**
     * @private
     * @param {Object} item Один документ результата запроса.
     * @param {String[]} tokens Список токенов запроса пользователя.
     */
    setTokenEqualsCount (item, tokens) {
        item.equalsCount = 0;

        tokens.forEach(function (token) {
            if (~item.tags.indexOf(token)) {
                item.equalsCount++;
            }
        });
    }

    /**
     * @private
     * @param {String} query Строка запроса.
     * @param {String[]} tokens Список токенов запроса пользователя.
     * @return {Object} Запрос для базы.
     */
    makeDBQuery (query, tokens) {
        if (query) {
            return {
                tags: {
                    $in: tokens
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
                this.sendError(callback, 'Ошибка обработки запроса базой данных!');
            } else {
                this.sendData(callback, data);
            }
        }.bind(this)
    }

    /**
     * @private
     * @param {Function} callback Колбэк для возврата результата.
     * @param {String} error Текст ошибки.
     */
    sendError (callback, error) {
        callback(null, [], false, error);
    }

    /**
     * @private
     * @param {Function} callback Колбэк для возврата результата.
     * @param {Array} data Массив результата поиска.
     */
    sendData (callback, data) {
        callback(null, data, true, '');
    }
}
new Search();

/**
 * Поисковый механизм.
 */
Ext.define('B.biz.search.Search', {
    extend: 'B.AbstractRequestHandler',

    config: {
        searchCollection: null,
        tokens: null,
        fieldsToReturn: {
            _id: 1,
            tags: 1,
            rating: 1
        }
    },

    constructor: function () {
        this.callParent(arguments);
        this.setSearchCollection(B.Mongo.getCollection('search'));
        this.makeQueryTokens();
        this.doDBQuery();
    },

    /**
     * @private
     * @return {String[]} Массив токенов.
     */
    makeQueryTokens: function () {
        this.setTokens(
            this
            .getRequestModel()
            .get('query')
            .toLowerCase()                        // Приводим к строчным буквам
            .replace(/ +/g, ' ')                  // Заменяем повторяющиеся пробелы на 1 пробел
            .replace(/ - /g, '-')                 // Схлопываем тире в дефис
            .replace(/ -|- /g, '-')               // И по краям
            .replace(/[,]|[.]|[_]/g, ' ')         // Заменяем точки, запятые и подчеркивания на пробелы
            .replace(/ +/g, ' ')                  // Заменяем повторяющиеся пробелы на 1 пробел
            .replace(/ . /g, ' ')                 // Убираем однобуквенные слова
            .replace(/ .. /g, ' ')                // Убираем двухбуквенные слова
            .replace(/^. | .$/g, '')              // И по краям
            .replace(/ё/g, 'е')                   // Меняем "ё" на "е" для фикса вариантов написания
            .split(' ')                           // Режем на части по пробелу
            .map(
                this.removeTokenEnds.bind(this)   // Убираем окончания
            )
        );
    },

    /**
     * @private
     * @param {String} token Токен запроса.
     * @return {String} Токен без окончания.
     */
    removeTokenEnds: function (token) {
        token = token.trim();                // Убираем пробельные символы у токена, есть кейсы

        if (token.length < 6) {              // 3-5 букв, режем однобуквенные окончания
            return token.slice(0, -1);
        }

        if (token.length < 8) {              // 6-7 букв, режем двухбуквенные окончания
            return token.slice(0, -2);
        }

        return token.slice(0, -3);           // 8 и более букв, режем трехбуквенные окончания
    },

    /**
     * @private
     */
    doDBQuery: function () {
        var model = this.getRequestModel();
        var cursor = this.findCursor();
        var sendResult = this.sendResult.bind(this);

        if (this.isEmptyTokens()) {
            cursor
                .sort({rating: -1})
                .toArray(sendResult);
        } else {
            cursor
                .skip(model.get('start'))
                .limit(model.get('limit'))
                .toArray(sendResult);
        }
    },

    findCursor: function () {
        var dbQuery = this.makeDBQuery();
        var collection = this.getSearchCollection();
        var fields = this.getFieldsToReturn();

        return collection.find(dbQuery, fields);
    },

    /**
     * @private
     * @return {Function} Отправлятель результата поиска.
     */
    sendResult: function (error, data) {
        var model = this.getRequestModel();
        var start = model.get('start');
        var limit = model.get('limit');

        if (error) {
            return this.sendSearchError();
        }

        if (!this.isEmptyTokens()) {
            data = data.splice(start, limit);
        }

        this.sortAndSend(data);
    },

    /**
     * @private
     */
    sendSearchError: function () {
        this.getProtocol().sendError('Ошибка запроса к базе данных при поиске!');
    },

    /**
     * @private
     * @param {Object[]} data Массив найденных данных.
     */
    sortAndSend: function (data) {
        var needSort = !this.isEmptyTokens();

        if (needSort) {
            data = this.sortResult(data);
        }

        data = data.map(function (item) {
            return {
                id: item._id
            }
        });

        this.getProtocol().sendData(data);
    },

    /**
     * @private
     * @return {Boolean} Пустой ли набор токенов.
     */
    isEmptyTokens: function () {
        return this.getTokens()[0] === '';
    },

    /**
     * @private
     * @param {Object[]} data Массив результата запроса для сортировки.
     * @return {Object[]} Массив отсортированных данных.
     */
    sortResult: function (data) {
        return data.sort(function (itemA, itemB) {
            this.applyTokenEqualsCount(itemA, itemB);

            return this.compareResultItems(itemA, itemB);
        });
    },

    /**
     * @private
     * @param {Object} itemA Первый документ.
     * @param {Object} itemB Второй документ.
     * @return {Number} Предикат сортировки.
     */
    compareResultItems: function (itemA, itemB) {
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
    },

    /**
     * @private
     * @param {Object} itemA Первый документ.
     * @param {Object} itemB Второй документ.
     */
    applyTokenEqualsCount: function (itemA, itemB) {
        if (!itemA.equalsCount) {
            this.setTokenEqualsCount(itemA);
        }

        if (!itemB.equalsCount) {
            this.setTokenEqualsCount(itemB);
        }
    },

    /**
     * @private
     * @param {Object} item Один документ результата запроса.
     */
    setTokenEqualsCount: function (item) {
        item.equalsCount = 0;

        this.getTokens().forEach(function (token) {
            if (Ext.Array.contains(item.tags, token)) {
                item.equalsCount++;
            }
        });
    },

    /**
     * @private
     * @return {Object} Запрос для базы.
     */
    makeDBQuery: function () {
        if (this.isEmptyTokens()) {
            return {};
        } else {
            return {
                tags: {
                    $in: this.getTokens()
                }
            };
        }
    }
});

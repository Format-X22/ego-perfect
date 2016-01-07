/**
 * Обеспечивает поисковый механизм для пользователей.
 */
'use strict';

var express = require('express');
var router = express.Router();
var Mongo = require('../modules/Mongo');
var Protocol = require('../modules/Protocol');

router.get('/', function(request, response) {
    var params = request.query;
    var query = params.query;
    var start = Number(params.start);
    var limit = Number(params.limit);
    var tokens;

    if (isRequestValid(query, start, limit)) {
        tokens = getQueryTokens(query);

        doDBQuery({
            dbQuery: makeDBQuery(query, tokens),
            fields: {_id: 1, tags: 1, rating: 1},
            start: start,
            limit: limit,
            tokens: tokens,
            response: response
        });
    } else {
        Protocol.sendError(response, 'Не валидные параметры запроса!');
    }
});

/**
 * @private
 * @param {String} query Строка запроса.
 * @return {String[]} Массив токенов.
 */
function getQueryTokens (query) {
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
        .map(removeTokenEnds);          // Убираем окончания
}

/**
 * @private
 * @param {String} token Токен запроса.
 * @return {String} Токен без окончания.
 */
function removeTokenEnds (token) {
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
function isRequestValid (query, start, limit) {
    if (query && query.length > 300) {
        return false;
    }

    if (typeof start !== 'number' || start > 1000000) {
        return false;
    }

    if (typeof limit !== 'number' || limit > 100) {
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
 * @param {Function} cfg.response Объект ответа сервера.
 */
function doDBQuery (cfg) {
    getSearchCollection()
        .find(cfg.dbQuery, cfg.fields)
        .sort({rating: -1})
        .skip(cfg.start)
        .limit(cfg.limit)
        .toArray(
            sortOnResult(cfg.tokens, cfg.response)
        );
}

/**
 * @private
 * @param {String[]} tokens Список токенов запроса пользователя.
 * @param {Object} response Объект ответа сервера.
 * @return {Function}
 * Функция, принимающая ошибку и массив данных,
 * сортирующая данные для возврата пользователю.
 */
function sortOnResult (tokens, response) {
    return function (error, data) {
        var notNeedSort = isEmptyTokens(tokens);

        if (error) {
            Protocol.sendError(response, 'Ошибка запроса к базе данных при поиске!');
            return;
        }

        if (notNeedSort) {
            Protocol.sendData(response, data);
        } else {
            Protocol.sendData(response, sortResult(data, tokens));
        }
    };
}

/**
 * @private
 * @param {String[]} tokens Список токенов запроса пользователя.
 * @return {Boolean} Пустой ли набор токенов.
 */
function isEmptyTokens (tokens) {
    return tokens[0] === '';
}

/**
 * @private
 * @param {Object[]} data Массив результата запроса для сортировки.
 * @param {String[]} tokens Список токенов запроса пользователя.
 * @return {Object[]} Массив отсортированных данных.
 */
function sortResult (data, tokens) {
    return data.sort(function (itemA, itemB) {
        applyTokenEqualsCount(itemA, itemB, tokens);

        return compareResultItems(itemA, itemB);
    });
}

/**
 * @private
 * @param {Object} itemA Первый документ.
 * @param {Object} itemB Второй документ.
 * @return {Number} Предикат сортировки.
 */
function compareResultItems (itemA, itemB) {
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
function applyTokenEqualsCount (itemA, itemB, tokens) {
    if (!itemA.equalsCount) {
        setTokenEqualsCount(itemA, tokens);
    }

    if (!itemB.equalsCount) {
        setTokenEqualsCount(itemB, tokens);
    }
}

/**
 * @private
 * @param {Object} item Один документ результата запроса.
 * @param {String[]} tokens Список токенов запроса пользователя.
 */
function setTokenEqualsCount (item, tokens) {
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
function makeDBQuery (query, tokens) {
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
function getSearchCollection () {
    return Mongo.collection('search');
}

module.exports = router;
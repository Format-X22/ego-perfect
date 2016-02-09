/**
 * Обеспечивает доступ к данным клиентов.
 */
'use strict';

var express = require('express');
var router = express.Router();
var Protocol = require('../modules/Protocol');
var Account = require('../modules/Account');
var Mongo = require('../modules/Mongo');
var Utils = require('../modules/Utils');

router.get('/', function (request, response) {
    var sender = Protocol.curryResponse(response);

    getAccount(request, function (account) {
        if (account) {
            Account.sanitiseAccountData(account);

            return sender.sendData(account);
        } else {
            return sender.sendAccessDenied();
        }
    });
});

router.post('/:name', getAccountOrDenyGetter(function (account, request, response) {
    var sender = Protocol.curryResponse(response);
    var query;
    var queryMethod = getQueryMakerMethod(request.params.name);
    var saveHandler = getSaveClientDataHandler(sender);

    if (!queryMethod) {
        return sender.sendAccessDenied();
    }

    try {
        query = queryMethod(request.body);
    } catch (error) {
        return sender.sendAccessDenied();
    }

    saveClientData(query, account.session, saveHandler);
}));

/**
 * @private
 * @param {Function} callback Следующий шаг.
 * @return {Function} Обертка над обработчиком запроса Express.
 */
function getAccountOrDenyGetter (callback) {
    return function (request, response) {
        getAccount(request, function (account) {
            if (account) {
                return callback(account, request, response);
            } else {
                return Protocol.sendAccessDenied(response);
            }
        });
    }
}

/**
 * @private
 * @param {Object} request Запрос.
 * @param {Function} callback Следующий шаг.
 */
function getAccount (request, callback) {
    Account.getAccountByKey(request.cookies.key, callback);
}

/**
 * @private
 * @param {Object} sender Отправитель ответов.
 * @return {Function} Функция, принимающая аргуметом успешность сохранения.
 */
function getSaveClientDataHandler (sender) {
    return function (success) {
        if (success) {
            return sender.sendSuccess();
        } else {
            return sender.sendError('Ошибка записи данных, попробуйте позднее.');
        }
    }
}

/**
 * @private
 * @param {String} requestName Имя запроса клиента.
 * @return {Function} Создатель запроса в базу.
 */
function getQueryMakerMethod (requestName) {
    switch (requestName) {
        case 'basic':
            return makeBasicSaveQuery;
        case 'summary':
            return makeSummarySaveQuery;
        case 'photo':
            return makePhotoSaveQuery;
        case 'words':
            return makeWordsSaveQuery;
    }
}

/**
 * @private
 * @param {Object} query Объект запроса в базу.
 * @param {String} key Ключ сессии.
 * @param {Function} callback Следующий шаг.
 */
function saveClientData (query, key, callback) {
    Mongo
        .collection('company')
        .findOneAndUpdate(
            {
                session: key
            },
            query,
            {},
            function (error) {
                callback(!error);
            }
        )
}

/**
 * @private
 * @param {Object} data Набор данных.
 * @return {Object} Запрос в базу.
 */
function makeBasicSaveQuery (data) {
    var map = String(data.map).split(' ');

    return makeSetQueryWrapper({
        name:    String(data.name),
        phone:   String(data.phone),
        site:    String(data.site),
        email:   String(data.email),
        time:    String(data.time),
        address: String(data.address),
        summary: String(data.summary),
        map: {
            lat: map[0],
            lng: map[1]
        }
    });
}

/**
 * @private
 * @param {Object} data Набор данных.
 * @return {Object} Запрос в базу.
 */
function makeSummarySaveQuery (data) {
    //
}

/**
 * @private
 * @param {Object} data Набор данных.
 * @return {Object} Запрос в базу.
 */
function makePhotoSaveQuery (data) {
    //
}

/**
 * @private
 * @param {Object} data Набор данных.
 * @return {Object} Запрос в базу.
 */
function makeWordsSaveQuery (data) {
    //
}

/**
 * @private
 * @param {Object} data Набор данны.
 * @return {Object} Набор данных, обернутый в запрос-сеттер.
 */
function makeSetQueryWrapper (data) {
    return {
        $set: data
    };
}

module.exports = router;
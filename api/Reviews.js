/**
 * Обеспечивает получение и отправку комментариев.
 */
'use strict';

var express = require('express');
var router = express.Router();
var Mongo = require('../modules/Mongo');
var Protocol = require('../modules/Protocol');

const DB_ERROR = 'Ошибка запроса к базе данных!';
const INVALID_ID = 'Не верный формат ID!';
const INVALID_PARAMS = 'Не верный формат данных!';

router.post('/', function(request, response) {
    var params = request.body;

    if (invalid(params, response)) {
        return;
    }

    Mongo
        .collection('company')
        .findOneAndUpdate(
            {
                _id: Mongo.objectID(params.id)
            },
            {
                $push: {
                    reviews: {
                        name: params.name,
                        header: params.header,
                        description: params.description,
                        captcha: params.captcha,
                        rating: params.rating,
                        date: getDate()
                    }
                }
            },
            {},
            function (error) {
                if (error) {
                    return Protocol.sendError(response, DB_ERROR);
                } else {
                    return Protocol.sendSuccess(response);
                }
            }
        );
});

/**
 * @private
 * @param {Object} params Набор параметров, отправленных клиентом.
 * @param {Object} response Объект ответа сервера.
 * @return {Boolean} True если данные не валидны.
 */
function invalid (params, response) {
    if (
        !params.id ||
        !params.name ||
        !params.header ||
        !params.description ||
        !params.captcha ||
        !params.rating ||
         params.rating < 1 ||
         params.rating > 5
    ) {
        Protocol.sendError(response, INVALID_PARAMS);
        return true;
    }

    try {
        Mongo.objectID(params.id);
    } catch (error) {
        Protocol.sendError(response, INVALID_ID);
        return true;
    }

    return false;
}

/**
 * @private
 * @return {String} Строка даты в нужном формате.
 */
function getDate () {
    var date = new Date();
    var day = String(date.getDate());
    var month = String(date.getMonth() + 1);
    var year = String(date.getFullYear());

    if (day.length === 1) {
        day = '0' + day;
    }

    if (month.length === 1) {
        month = '0' + month;
    }

    return [day, month, year].join('.');
}

module.exports = router;
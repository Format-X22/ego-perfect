/**
 * Обеспечивает доступ к данным клиентов.
 */
'use strict';

var express = require('express');
var router = express.Router();
var Protocol = require('../modules/Protocol');
var Account = require('../modules/Account');

router.get('/', function (request, response) {
    getAccount(request, function (account) {
        if (account) {
            Account.sanitiseAccountData(account);

            return Protocol.sendData(response, account);
        } else {
            return Protocol.sendAccessDenied(response);
        }
    });
});

router.post('/', function (request, response) {
    getAccount(request, function (account) {
        if (!account) {
            return Protocol.sendAccessDenied(response);
        }

        if (invalidClientData(request.body)) {
            return Protocol.sendError(response, 'Не верный набор данных.');
        }

        saveClientData(account.session, function (success) {
            if (success) {
                return Protocol.sendSuccess(response);
            } else {
                return Protocol.sendError(response, 'Ошибка записи данных, попробуйте позднее.');
            }
        });
    });
});

function getAccount (request, callback) {
    Account.getAccountByKey(request.cookies.key, callback);
}

function invalidClientData () {
    // @TODO
}

function saveClientData () {
    // @TODO
}

module.exports = router;
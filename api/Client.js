/**
 * Обеспечивает доступ к данным клиентов.
 */
'use strict';

var express = require('express');
var router = express.Router();
var Protocol = require('../modules/Protocol');
var Account = require('../modules/Account');

router.get('/', function (request, response) {
    Account.getAccountByKey(request.cookies.key, function (account) {
        if (account) {
            delete account.login;
            delete account.pass;
            delete account.session;
            delete account.randomSalt;

            return Protocol.sendData(response, account);
        } else {
            return Protocol.sendAccessDenied(response);
        }
    });
});

module.exports = router;
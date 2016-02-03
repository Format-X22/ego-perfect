/**
 * Обеспечивает процесс входа и выхода.
 */
'use strict';

var express = require('express');
var router = express.Router();
var Protocol = require('../modules/Protocol');
var Access = require('../modules/Access');

router.post('/login', function(request, response) {
    var config = {
        type: request.body.type,
        login: request.body.login,
        pass: request.body.pass
    };

    Access.login(config, function (success) {
        if (success) {
            Protocol.sendSuccess(response);
        } else {
            Protocol.sendError(response, 'Не верный логин или пароль!');
        }
    });
});

router.post('/logout', function(request, response) {
    Access.logout(request.cookies.key, function (success) {
        if (success) {
            Protocol.sendSuccess(response);
        } else {
            Protocol.sendAccessDenied(response);
        }
    });
});

router.post('/register', function(request, response) {
    var params = request.body;
    var config = {
        type: params.type,
        login: params.login,
        partner: params.partner,
        captcha: params.captcha
    };

    Access.register(config, function (success) {
        if (success) {
            Protocol.sendSuccess(response);
        } else {
            Protocol.sendError(response, 'Похоже что-то введено не верно...');
        }
    });
});

router.post('/changePass', function(request, response) {
    Access.changePass(request.cookies.key, function (success) {
        if (success) {
            Protocol.sendSuccess(response);
        } else {
            Protocol.sendAccessDenied(response);
        }
    });
});

router.post('/changeEmail', function(request, response) {
    Access.changeEmail(request.cookies.key, function (success) {
        if (success) {
            Protocol.sendSuccess(response);
        } else {
            Protocol.sendAccessDenied(response);
        }
    });
});

router.post('/restorePass', function(request, response) {
    Access.restorePass(request.body.login, function (success) {
        if (success) {
            Protocol.sendSuccess(response);
        } else {
            Protocol.sendError(response, 'Что-то пошло не так...');
        }
    });
});

module.exports = router;
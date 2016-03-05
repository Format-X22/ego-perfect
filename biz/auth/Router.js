/**
 * Роутер логики авторизации.
 */
Ext.define('B.biz.auth.Router', {
    extend: 'B.AbstractRouter',

    map: {
        '/login': {
            post: 'login'
        },
        '/logout': {
            post: 'logout'
        },
        '/register': {
            post: 'register'
        },
        '/changePass': {
            post: 'changePass'
        },
        '/changeLogin': {
            post: 'changeLogin'
        },
        '/confirmChangeLogin': {
            get: 'confirmChangeLogin'
        },
        '/restorePass': {
            post: 'restorePass'
        },
        '/confirmRestorePass': {
            post: 'confirmRestorePass'
        }
    },

    /**
     * Вход на сайт.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
    login: function (request, response) {
        var config = {
            type: request.body.type,
            login: request.body.login,
            pass: request.body.pass
        };

        Access.login(config, function (session) {
            if (session) {
                response.cookie('key', session, {
                    httpOnly: true
                });
                return Protocol.sendSuccess(response);
            } else {
                return Protocol.sendError(response, 'Не верный логин или пароль!');
            }
        });
    },

    /**
     * Выход из сайта.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
    logout: function (request, response) {
        Access.logout(request.cookies.key, function (success) {
            if (success) {
                response.clearCookie('key');
                return Protocol.sendSuccess(response);
            } else {
                return Protocol.sendAccessDenied(response);
            }
        });
    },

    /**
     * Регистрация на сайте.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
    register: function (request, response) {
        var params = request.body;
        var config = {
            type: params.type,
            login: params.login,
            partner: params.partner,
            captcha: params.captcha
        };

        Access.register(config, function (success) {
            if (success) {
                return Protocol.sendSuccess(response);
            } else {
                return Protocol.sendError(response, 'Похоже что-то введено не верно...');
            }
        });
    },

    /**
     * Смена пароля.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
    changePass: function (request, response) {
        Access.changePass(request.cookies.key, function (success) {
            if (success) {
                return Protocol.sendSuccess(response);
            } else {
                return Protocol.sendAccessDenied(response);
            }
        });
    },

    /**
     * Смена логина.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
    changeLogin: function (request, response) {
        Access.changeEmail(request.cookies.key, request.body.login, function (success) {
            if (success) {
                return Protocol.sendSuccess(response);
            } else {
                return Protocol.sendAccessDenied(response);
            }
        });
    },

    /**
     * Подтверждение смены логина.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
    confirmChangeLogin: function (request, response) {
        B.Protocol.sendSuccess(response);
    },

    /**
     * Сброс пароля.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
    restorePass: function (request, response) {
        Access.restorePass(request.body.login, request.body.type, function (success) {
            if (success) {
                return Protocol.sendSuccess(response);
            } else {
                return Protocol.sendError(response, 'Что-то пошло не так...');
            }
        });
    },

    /**
     * Подтверждение сброса пароля.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
    confirmRestorePass: function () {
        //
    }
});
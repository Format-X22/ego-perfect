/**
 * Роутер логики авторизации.
 */
Ext.define('B.biz.auth.Router', {
    extend: 'B.AbstractRouter',

    requires: [
        'B.biz.auth.ChangeLogin',
        'B.biz.auth.ChangePass',
        'B.biz.auth.ConfirmChangeLogin',
        'B.biz.auth.ConfirmRestorePass',
        'B.biz.auth.Login',
        'B.biz.auth.Logout',
        'B.biz.auth.Register',
        'B.biz.auth.RestorePass',
        'B.biz.auth.model.Base',
        'B.biz.auth.model.ChangeLogin',
        'B.biz.auth.model.Key',
        'B.biz.auth.model.Login',
        'B.biz.auth.model.Register',
        'B.biz.auth.model.RestorePass'
    ],

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
            get: 'confirmRestorePass'
        }
    },

    /**
     * Вход на сайт.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
    login: function (request, response) {
        var model = Ext.create('B.biz.auth.model.Login');
        var params = request.body;

        model.set({
            type: params.type,
            login: params.login,
            pass: params.pass
        });

        if (this.checkRequestModel(model, response)) {
            Ext.create('B.biz.auth.Login', {
                expressRequest: request,
                expressResponse: response,
                requestModel: model
            });
        }
    },

    /**
     * Выход из сайта.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
    logout: function (request, response) {
        var model = Ext.create('B.biz.auth.model.Key');

        model.set({
            key: request.cookies.key
        });

        if (this.checkRequestModel(model, response)) {
            Ext.create('B.biz.auth.Logout', {
                expressRequest: request,
                expressResponse: response,
                requestModel: model
            });
        }
    },

    /**
     * Регистрация на сайте.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
    register: function (request, response) {
        var model = Ext.create('B.biz.auth.model.Register');
        var params = request.body;

        model.set({
            type: params.type,
            login: params.login,
            partner: params.partner,
            captcha: params.captcha
        });

        if (this.checkRequestModel(model, response)) {
            Ext.create('B.biz.auth.Register', {
                expressRequest: request,
                expressResponse: response,
                requestModel: model
            });
        }

        //'Похоже что-то введено не верно...';
        //Сессия?
    },

    /**
     * Смена пароля.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
    changePass: function (request, response) {
        var model = Ext.create('B.biz.auth.model.Key');

        model.set({
            key: request.cookies.key
        });

        if (this.checkRequestModel(model, response)) {
            Ext.create('B.biz.auth.ChangePass', {
                expressRequest: request,
                expressResponse: response,
                requestModel: model
            });
        }
    },

    /**
     * Смена логина.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
    changeLogin: function (request, response) {
        var model = Ext.create('B.biz.auth.model.ChangeLogin');

        model.set({
            login: request.body.login,
            key: request.cookies.key
        });

        if (this.checkRequestModel(model, response)) {
            Ext.create('B.biz.auth.ChangeLogin', {
                expressRequest: request,
                expressResponse: response,
                requestModel: model
            });
        }
    },

    /**
     * Подтверждение смены логина.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
    confirmChangeLogin: function (request, response) {
        var model = Ext.create('B.biz.auth.model.Key');

        model.set({
            key: request.cookies.key
        });

        if (this.checkRequestModel(model, response)) {
            Ext.create('B.biz.auth.ConfirmChangeLogin', {
                expressRequest: request,
                expressResponse: response,
                requestModel: model
            });
        }
    },

    /**
     * Сброс пароля.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
    restorePass: function (request, response) {
        var model = Ext.create('B.biz.auth.model.RestorePass');
        var params = request.body;

        model.set({
            login: params.login,
            type: params.type
        });

        if (this.checkRequestModel(model, response)) {
            Ext.create('B.biz.auth.RestorePass', {
                expressRequest: request,
                expressResponse: response,
                requestModel: model
            });
        }

        //'Что-то пошло не так...';
    },

    /**
     * Подтверждение сброса пароля.
     * @param {Object} request Express объект запроса сервера.
     * @param {Object} response Express объект ответа сервера.
     */
    confirmRestorePass: function (request, response) {
        var model = Ext.create('B.biz.auth.model.Key');

        model.set({
            key: request.cookies.key
        });

        if (this.checkRequestModel(model, response)) {
            Ext.create('B.biz.auth.ConfirmRestorePass', {
                expressRequest: request,
                expressResponse: response,
                requestModel: model
            });
        }
    }
});
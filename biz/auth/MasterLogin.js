/**
 * Логика входа на сайт через мастер-логин.
 */
Ext.define('B.biz.auth.MasterLogin', {
    extend: 'B.AbstractRequestHandler',

    requires: [
        'B.biz.auth.util.Account',
        'B.biz.auth.util.Crypt',
        'B.biz.auth.util.Session'
    ],

    constructor: function () {
        this.callParent(arguments);

        var id = this.getMongoId();
        var session = this.getSession();

        B.Mongo.getCollection('company').update(
            {
                _id: id
            },
            {
                $set: {
                    session: session
                }
            },
            function (error, result) {
                if (error) {
                    this.sendUpdateError(error);
                    return;
                }

                if (this.isNoAccount(result)) {
                    this.sendIdError();
                    return;
                }

                this.setKeyCookie(session);
                this.sendSuccess();
            }.bind(this)
        );
    },

    privates: {

        /**
         * @private
         * @return {Mongo.ObjectID} Mongo ObjectID.
         */
        getMongoId: function () {
            var id = this.getRequestModel().get('id');

            return B.Mongo.makeId(id);
        },

        /**
         * @private
         * @return {String} Сессия.
         */
        getSession: function () {
            return String(Number(new Date())) + Math.random();
        },

        /**
         * @private
         * @param {Object} result Объект результата запроса.
         * @return {Boolean} Результат проверки.
         */
        isNoAccount: function (result) {
            return !result.result.nModified;
        },

        /**
         * @private
         * @param {String} value Значение для установки.
         */
        setKeyCookie: function (value) {
            var response = this.getExpressResponse();

            response.cookie('key', value, {
                httpOnly: true
            });
            response.cookie('type', 'company', {
                httpOnly: false
            });
        },

        /**
         * @private
         * @param {Object} error Объект ошибки.
         */
        sendUpdateError: function (error) {
            this.sendError('Ошибка обновления сессии: ' + error);
        },

        /**
         * @private
         */
        sendIdError: function () {
            this.sendError('Аккаунт с таким ID не найден!');
        }
    }
});
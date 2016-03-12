/**
 * Логика смены логина.
 */
Ext.define('B.biz.auth.ChangeLogin', {
    extend: 'B.AbstractRequestHandler',

    constructor: function () {
        this.callParent(arguments);
        this.getProtocol().sendSuccess();
    }
});



return;

/**
 * Обработка смены почты.
 * @param {String} key Ключ сессии.
 * @param {String} login Логин.
 * @param {Function} callback Следующий шаг.
 */
exports.changeEmail = function (key, login, callback) {
    var backFalse = getStoredBackFalse(callback);

    if (!key) {
        return callback(false);
    }

    Account.getAccountByKey(key, backFalse(function (account, type) {

        Salt.makePass(login, backFalse(function (pass, passHash) {

            Mail.sendAuthMail(acc(type, login, pass), function () {

                setAuthData({
                    type: type,
                    session: key,
                    set: {
                        login: login,
                        pass: passHash
                    }
                }, backFalse(function () {

                    removeSession(key, type, callback);
                }));
            })
        }));
    }));
};

/**
 * Обработка восстановления пароля.
 * @param {String} login Логин.
 * @param {String} type Тип аккаунта.
 * @param {Function} callback Следующий шаг.
 */
exports.restorePass = function (login, type, callback) {
    var backFalse = getStoredBackFalse(callback);

    if (!login) {
        return callback(false);
    }

    Account.getAccountByLogin(login, type, backFalse(function (account) {
        // @TODO
    }));
};


/**
 * @private
 * @param {Object} config Объект параметров.
 * @param {Object} config.type Тип аккаунта.
 * @param {Object} config.session Ключ сессии.
 * @param {Object} config.set Набор данных для установки.
 * @param {Function} callback Следующий шаг.
 */
function setAuthData (config, callback) {
    Mongo
        .collection(config.type)
        .findOneAndUpdate(
            {
                session: config.session
            },
            {
                $set: config.set
            },
            {},
            function (error) {
                return callback(!error);
            }
        )
}

/**
 * @private
 * @param {String} type Тип аккаунта.
 * @param {String} login Логин.
 * @param {String} pass Пароль.
 * @return {Object} Сгруппированные в объект параметры.
 */
function acc (type, login, pass) {
    return {
        type: type,
        login: login,
        pass: pass
    }
}
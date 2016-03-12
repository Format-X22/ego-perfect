/**
 * Логика восстановления пароля.
 */
Ext.define('B.biz.auth.RestorePass', {
    extend: 'B.biz.auth.AbstractPassModify',

    requires: [
        'B.Mail',
        'B.biz.auth.util.Account',
        'B.biz.auth.util.Crypt',
        'B.biz.auth.util.Session'
    ],

    config: {

        /**
         * @cfg {Object} account Данные аккаунта.
         */
        account: null,

        /**
         * @cfg {B.biz.auth.util.Crypt} crypt Объект криптографии.
         */
        crypt: null
    },

    /**
     * @inheritdoc
     */
    checkAccountExistStep: function (next) {
        var model = this.getRequestModel();

        Ext.create('B.biz.auth.util.Account', {
            login: model.get('login'),
            type: model.get('type'),
            scope: this,
            callback: function (acc) {
                var accData = acc.getFullAccountData();

                this.setAccount(accData);

                if (accData) {
                    next();
                } else {
                    this.sendError('Такого аккаунта не существует!');
                }
            }
        });
    }
});
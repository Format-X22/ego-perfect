/**
 * Логика выхода из сайта.
 */
Ext.define('B.biz.auth.Logout', {
    extend: 'B.AbstractRequestHandler',

    requires: [
        'B.biz.auth.util.Session'
    ],

    constructor: function () {
        this.callParent(arguments);
        
        var sessionUtil = Ext.create('B.biz.auth.util.Session', {
            session: this.getRequestModel().get('key'),
            scope: this,
            callback: function () {
                if (sessionUtil.getError()) {
                    this.sendError('Сессии не существует.');
                } else {
                    this.removeSessionCookie();
                    this.sendSuccess();
                }
            }
        });

        sessionUtil.removeSession();
    },

    privates: {

        /**
         * @private
         */
        removeSessionCookie: function () {
            this.getExpressResponse().cookie('key', '', {
                httpOnly: true
            });
        }
    }
});
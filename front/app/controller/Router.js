/**
 * Глобальный роутер всего приложения.
 */
Ext.define('A.controller.Router', {
    extend: 'Ext.app.Controller',

    config: {
        isFirstCall: true
    },
    
    routes: {
        '/rootPage$:id': 'goToRootPage',
        '/company$:id': 'goToCompanyPage',
        '/account$:id': 'goToAccountPage'
    },

    goToRootPage: function (id) {
        if (this.isNotFirstCall()) {
            return;
        }

        console.log('go to root page ' + id);
    },

    goToCompanyPage: function (id) {
        if (this.isNotFirstCall()) {
            return;
        }

        console.log('go to company page ' + id);
    },

    goToAccountPage: function (id) {
        if (this.isNotFirstCall()) {
            return;
        }

        console.log('go to account page ' + id);
    },

    privates: {

        /**
         * @private
         * @return {Boolean} True если не первый вызов.
         */
        isNotFirstCall: function () {
            var isFirstCall = this.getIsFirstCall();

            this.setIsFirstCall(false);

            return !isFirstCall;
        }
    }
});
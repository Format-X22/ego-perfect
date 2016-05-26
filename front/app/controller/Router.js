/**
 * Глобальный роутер всего приложения.
 */
Ext.define('A.controller.Router', {
    extend: 'Ext.app.Controller',

    config: {
        isFirstCall: true
    },
    
    routes: {
        'rootPage/register/:key': 'goToRegisterPageWithKey',
        'rootPage/:id': 'goToRootPage',
        'company/:id': 'goToCompanyPage',
        'account/:id': 'goToAccountPage'
    },

    /**
     * Переносит на указанную страницу главной панели вкладок.
     * @param {String} id Идентификатор страницы.
     */
    goToRootPage: function (id) {
        if (this.isNotFirstCall()) {
            return;
        }

        var main = this.getMainTabPanel();

        switch (id) {
            case 'clients':
                main.setActiveItem(1);
                return;
            case 'contacts':
                main.setActiveItem(2);
                return;
            case 'login':
                main.setActiveItem(3);
                return;
            case 'register':
                main.setActiveItem(4);
                return;
        }
    },

    /**
     * Переносит на страницу компании.
     * @param {String} id Идентификатор страницы.
     */
    goToCompanyPage: function (id) {
        if (this.isNotFirstCall()) {
            return;
        }

        var main = this.getMainTabPanel();
        
        main.down('searchContainer').getController().toggleInitView();
        main.down('searchResult').getController().openCompany(id);
    },

    /**
     * Переносит на страницу входа в аккаунт.
     * @param {String} id Идентификатор страницы.
     */
    goToAccountPage: function (id) {
        if (this.isNotFirstCall()) {
            return;
        }

        var main = this.getMainTabPanel();

        switch (id) {
            case 'client':
            case 'partner':
                main.setActiveItem(4);
                return;
        }
    },

    /**
     * Обрабатывает партнерские ссылки.
     * Переносит на страницу регистрации и сразу проставляет ключ.
     * @param {String} key Ключ партнера.
     */
    goToRegisterPageWithKey: function (key) {
        A.getCmp('appMainPublic #register #partner').setValue(key);
        this.goToRootPage('register');
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
        },

        /**
         * @privates
         * @return {Ext.Component} Главная панель вкладок.
         */
        getMainTabPanel: function () {
            return A.getCmp('#mainTabPanel');
        }
    }
});
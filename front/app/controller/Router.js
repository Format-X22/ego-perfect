/**
 * Глобальный роутер всего приложения.
 */
Ext.define('A.controller.Router', {
    singleton: true,

    config: {

        /**
         * @private
         * @cfg {Boolean} isFirstCall Первый ли запуск.
         */
        isFirstCall: true,

        /**
         * @private
         * @cfg {String} linkSplitter Разделитель в ссылках.
         */
        linkSplitter: '-'
    },
    
    constructor: function () {
        this.initConfig(this.config);
    },

    /**
     * Переход на текущую страницу.
     */
    goToCurrentPage: function () {
        var path = this.getPathLink();
        var end = this.getEndPoint();
        
        switch (path) {
            case 'root-register':
                this.goToRegisterPageWithKey(end);
                break;
            case 'root':
                this.goToRootPage(end);
                break;
            case 'company':
                this.goToCompanyPage(end);
                break;
            case 'account':
                this.goToAccountPage(end);
                break;
        }
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
                main.setActiveItem(3);
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
         * @return {String} Токен.
         */
        getFullLink: function () {
            return location.pathname.replace('/page-', '');
        },

        /**
         * @private
         * @param {Number[]} range Диапазон, 1 или 2 значения.
         * @return {String} Токен.
         */
        extractLinkTokens: function (range) {
            var splitter = this.getLinkSplitter();
            var split = this.getFullLink().split(splitter);
            var tokens = [].slice.apply(split, range);
            
            return tokens.join(splitter);
        },

        /**
         * @private
         * @return {String} Токен.
         */
        getPathLink: function () {
            return this.extractLinkTokens([0, -1]);
        },

        /**
         * @private
         * @return {String} Токен.
         */
        getEndPoint: function () {
            return this.extractLinkTokens([-1]);
        },

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
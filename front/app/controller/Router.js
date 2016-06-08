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
     * Меняет путь на указанный.
     * @param {String} path Путь.
     * @param {Boolean} [force] Необходимо ли ситирать вложенные пути, даже если основные пути совпадают.
     */
    changePathTo: function (path, force) {
        var current = this.getCurrentPath();
        var currentSub = this.getCurrentSubPath();
        var pathWithoutSub = path.split('_')[0];
        var equivalent = (current === pathWithoutSub);

        path = 'page-' + path;

        if (equivalent && currentSub && !force) {
            path = path + '_' + currentSub;
        }

        history.pushState('', '', path);
    },

    /**
     * Меняет вложенный путь на указанный.
     * @param {String} path Вложенный путь.
     */
    changeSubPathTo: function (path) {
        this.changePathTo(this.getCurrentPath() + '_' + path, true);
    },

    /**
     * Получение текущего пути, без префикса.
     * @return {String} Токен.
     */
    getCurrentPath: function () {
        var path = location.pathname;
        var withoutPrefix = path.replace('/page-', '');

        return withoutPrefix.split('_')[0];
    },

    /**
     * Получение текущего вложенного пути.
     * @return {String} Токен.
     */
    getCurrentSubPath: function () {
        var splitter = '_';
        var path = location.pathname;
        var withoutPrefix = path.replace('/page-', '');
        var asArray = withoutPrefix.split(splitter);

        return asArray.slice(1).join(splitter);
    },

    /**
     * Получение текущего пути как базового пути, без префикса и эндпоинта.
     * @return {String} Токен.
     */
    getCurrentPathBase: function () {
        return this.extractCurrentPathTokens([0, -1]);
    },

    /**
     * Получение текущего эндпоинта для текущего пути.
     * @return {String} Токен.
     */
    getCurrentPathEndPoint: function () {
        return this.extractCurrentPathTokens([-1]);
    },

    /**
     * Переход на текущую страницу.
     */
    goToCurrentPage: function () {
        var path = this.getCurrentPathBase();
        
        switch (path) {
            case 'root-register':
                this.goToRegisterPageWithKey();
                break;
            case 'root':
                this.goToRootPage();
                break;
            case 'company':
                this.goToCompanyPage();
                break;
            case 'account':
                this.goToAccountPage();
                break;
        }
    },

    /**
     * Переносит на указанную страницу главной панели вкладок.
     * @param {String} [id] В ручную заданный идентификатор страницы.
     */
    goToRootPage: function (id) {
        if (this.isNotFirstCall()) {
            return;
        }

        var main = this.getMainTabPanel();

        if (!id) {
            id = this.getCurrentPathEndPoint();
        }

        main.setActiveItem(main.down('#' + id));
        
        if (id === 'clients') {
            this.setActiveInfoPageSubIfNeed(id);
        }
    },

    /**
     * Переносит на страницу компании.
     */
    goToCompanyPage: function self () {
        if (this.isNotFirstCall()) {
            return;
        }

        var id = this.getCurrentPathEndPoint();

        this.getSearchContainerController().toggleInitView();
        this.getSearchResultController().openCompany(id);
        this.goToCompanyInnerTabFromPage();
    },

    /**
     * Переносит на страницу входа в аккаунт.
     */
    goToAccountPage: function () {
        if (this.isNotFirstCall()) {
            return;
        }

        var id = this.getCurrentPathEndPoint();
        var main = this.getMainTabPanel();

        switch (id) {
            case 'client':
            case 'partner':
                main.setActiveItem('login');
                return;
        }
    },

    /**
     * Обрабатывает партнерские ссылки.
     * Переносит на страницу регистрации и сразу проставляет ключ.
     */
    goToRegisterPageWithKey: function () {
        var key = this.getCurrentPathEndPoint();

        A.getCmp('appMainPublic #register #partner').setValue(key);
        this.goToRootPage('register');
    },

    privates: {

        /**
         * @private
         * @param {Number[]} range Диапазон, 1 или 2 значения.
         * @return {String} Токен.
         */
        extractCurrentPathTokens: function (range) {
            var splitter = '-';
            var split = this.getCurrentPath().split(splitter);
            var tokens = [].slice.apply(split, range);

            return tokens.join(splitter);
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
        },

        /**
         * @private
         * @param {String} itemId ID страницы.
         */
        setActiveInfoPageSubIfNeed: function (itemId) {
            var main = this.getMainTabPanel();
            var tabPanel = main.down('#' + itemId);
            var subPath = this.getCurrentSubPath();

            if (subPath) {
                tabPanel.setActiveItem(subPath);    
            }
        },

        /**
         * @private
         */
        goToCompanyInnerTabFromPage: function () {
            var id = this.getCurrentPathEndPoint();
            var subPath = this.getCurrentSubPath();
            var subBase = subPath.split('_')[0];
            var subEnd = subPath.split('_')[1];

            if (subPath) {
                this.switchCompanyInnerTabs();
            }
            
            if (subEnd && (subBase === 'reviews')) {
                this.switchCompanyReviewsTabs();
            }
        },

        /**
         * @private
         */
        switchCompanyInnerTabs: function () {
            var detailsTabPanels = this.getDetailsTabPanels();
            var subPath = this.getCurrentSubPath();
            var subBase = subPath.split('_')[0];

            Ext.each(detailsTabPanels, function (panel) {
                var toActive = panel.down('#' + subBase);

                panel.setActiveItem(toActive);
            }, this);
        },

        /**
         * @private
         */
        switchCompanyReviewsTabs: function () {
            var detailsTabPanels = this.getDetailsTabPanels();
            var subPath = this.getCurrentSubPath();
            var subEnd = subPath.split('_')[1];

            Ext.each(detailsTabPanels, function (panel) {
                var toActive = panel.down('#' + subEnd);

                panel.down('#reviewsTabPanel').setActiveItem(toActive);
            }, this);
        },

        /**
         * @private
         * @return {Ext.Component[]} Массив панелей вкладок.
         */
        getDetailsTabPanels: function () {
            return this.getMainTabPanel().query('[companyDetailsTabPanel]');
        },

        /**
         * @private
         * @return {Ext.app.ViewController} Вью-контроллер.
         */
        getSearchContainerController: function () {
            return this.getControllerUnderMainTabPanel('searchContainer');
        },

        /**
         * @private
         * @return {Ext.app.ViewController} Вью-контроллер.
         */
        getSearchResultController: function () {
            return this.getControllerUnderMainTabPanel('searchResult');
        },

        /**
         * @private
         * @param {String} selector Селектор до целевого вью.
         * @return {Ext.app.ViewController} Вью-контроллер.
         */
        getControllerUnderMainTabPanel: function (selector) {
            return this.getMainTabPanel().down(selector).getController();
        }
    }
});
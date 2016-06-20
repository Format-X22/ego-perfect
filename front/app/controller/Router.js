/**
 * Глобальный роутер всего приложения.
 * @TODO Класс будет переписан полностью под новую парадигму перемещения. Код этого класса может вызывать сомнения.
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

        window.onpopstate = function() {
            this.goToCurrentPage();
        }.bind(this);
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
            case '':
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
        var main = this.getMainTabPanel();
        var resultCard;
        var searchResultContainer;
        var company;

        if (!id) {
            id = this.getCurrentPathEndPoint();
        }
        
        if (id === '/') {
            id = 'search';
        }
        
        if (Ext.isClassic && id === 'offer') {
            this.changePathTo('root-clients');
            this.changeSubPathTo('offer');
            this.goToCurrentPage();
            return;
        }
        
        if (!Ext.isClassic && id === 'clients' && this.getCurrentSubPath() === 'offer') {
            this.changePathTo('root-offer', true);
            this.goToCurrentPage();
            return;
        }
        
        main.setActiveItem(main.down('#' + id));
        
        if (id === 'clients') {
            this.setActiveInfoPageSubIfNeed(id);
        }

        if (id === 'search') {
            if (Ext.isClassic) {
                resultCard = main.down('#resultCard');
                searchResultContainer = resultCard.down('#resultCardScrollContainer');
                company = resultCard.down('#company');

                if (searchResultContainer.isHidden() && company.isVisible()) {
                    resultCard.up('searchResult').getController().backToSearch();
                }
            } else {
                resultCard = main.down('#resultCard');
                searchResultContainer = resultCard.down('#searchResultContainer');
                company = resultCard.down('#company');

                if (searchResultContainer.isHidden() && company.isVisible()) {
                    resultCard.up('searchResult').getController().backToSearch();
                }
            }
        }
    },

    /**
     * Переносит на страницу компании.
     */
    goToCompanyPage: function self () {
        var id = this.getCurrentPathEndPoint();
        var companyContainer = A.getCmp('companyContainer');
        var companyViewModel = A.getCmp('companyContainer').getViewModel();
        var isEmptyCompany = (companyViewModel.get('_id') === 'empty_logo');
        var companyPageOpened = companyContainer.isVisible();
        var main = this.getMainTabPanel();
        var mobileMenu;

        main.setActiveItem(main.down('#search'));

        if (isEmptyCompany) {
            this.getSearchContainerController().toggleInitView();
        }

        if (isEmptyCompany || !companyPageOpened) {
            this.getSearchResultController().openCompany(id);
        }

        if (!Ext.isClassic) {
            mobileMenu = A.getCmp('mobileMenu');
            
            if (mobileMenu) {
                mobileMenu.getController().toggleBackToSearchMobileButton(0);
            }
        }

        this.goToCompanyInnerTabFromPage();
    },

    /**
     * Переносит на страницу входа в аккаунт.
     */
    goToAccountPage: function () {
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
        var storage = Ext.util.LocalStorage.get('partnerKey');

        storage.setItem('key', key);
        storage.release();

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
            return this.extractPathTokens(range, this.getCurrentPath());
        },

        /**
         * @private
         * @param {Number[]} range Диапазон, 1 или 2 значения.
         * @param {String} path Путь.
         * @return {String} Токен.
         */
        extractPathTokens: function (range, path) {
            var splitter = '-';
            var split = path.split(splitter);
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
            } else if (Ext.isClassic) {
                tabPanel.setActiveItem('show');
            }
        },

        /**
         * @private
         */
        goToCompanyInnerTabFromPage: function () {
            var subPath = this.getCurrentSubPath();
            var subBase = subPath.split('_')[0];
            var subEnd = subPath.split('_')[1];

            this.switchCompanyInnerTabs();
            
            if (subEnd && (subBase === 'reviews')) {
                this.switchCompanyReviewsTabs();
            }
        },

        /**
         * @private
         */
        switchCompanyInnerTabs: function () {
            var subPath = this.getCurrentSubPath();
            var detailsTabPanels = this.getDetailsTabPanels();
            var subBase = subPath.split('_')[0];
            
            subBase = subBase || 'summary';

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
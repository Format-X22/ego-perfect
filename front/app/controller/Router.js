/**
 * Глобальный роутер всего приложения.
 */
Ext.define('A.controller.Router', {
    extend: 'Ext.app.Controller',

    modernFirstInit: true,

    routes: {
        'search': 'goToSearchPage',
        'clients': 'goToClientsPage',
        'partners': 'goToPartnersPage',
        'company/:id': 'goToCompanyPage'
    },

    control: {
        '#mainTabPanel': {
            tabchange: 'mainTabPanelRedirect'
        },
        'mainTabPanel': {
            activeitemchange: 'mainTabPanelRedirect'
        },
        '#resultCard #company': {
            show: 'companyOrSearchRedirect',
            hide: 'companyOrSearchRedirect'
        }
    },

    /**
     * Совершаем переход на страницу поиска.
     */
    goToSearchPage: function () {
        this.goToMainPageNum(0);
    },

    /**
     * Совершаем переход на страницу для клиентов.
     */
    goToClientsPage: function () {
        this.goToMainPageNum(1);
    },

    /**
     * Совершаем переход на страницу для партренов.
     */
    goToPartnersPage: function () {
        this.goToMainPageNum(2);
    },

    /**
     * Совершаем переход на страницу главного меню по указанному номеру.
     * @param {Number} num Номер.
     */
    goToMainPageNum: function (num) {
        var tabPanel = this.getMainTabPanel();

        if (Ext.isClassic) {
            tabPanel.setActiveTab(num);
        } else {
            tabPanel.setActiveItem(num);
        }
    },

    /**
     * Совершаем переход на страницу деталей компании.
     * @param {Number} id ID компании.
     */
    goToCompanyPage: function (id) {
        this.goToSearchPage();
        this.simulateCompanyOpenAction(id);
    },
    /**
     * Редирект сменой хэша на выбранную страницу из главной панели вкладок.
     * @param {Ext.tab.Panel} tabPanel Панель вкладок.
     */
    mainTabPanelRedirect: function (tabPanel) {
        var active;

        if (Ext.isClassic) {
            active = tabPanel.getActiveTab();
        } else {
            active = tabPanel.getActiveItem()
        }

        this.redirectTo(active.getItemId());
    },

    /**
     * Редирект сменой хэша на страницу компании, либо назад на поиск.
     * @param {Ext.container.Container/Ext.Container} companyContainer Контейнер.
     */
    companyOrSearchRedirect: function (companyContainer) {
        if (!Ext.isClassic && this.modernFirstInit) {
            this.modernFirstInit = false;
            return;
        }

        var id = companyContainer.getViewModel().getId();

        id = id.split('-');
        id = id[id.length - 1];
        id = Number(id);

        if (companyContainer.isHidden()) {
            this.redirectTo('search');
        } else {
            this.redirectTo('company/' + id);
        }
    },

    privates: {

        /**
         * @private
         * @param {Number} id ID компании.
         */
        simulateCompanyOpenAction: function (id) {
            var resultCard = this.getResultCardTabPanel();

            resultCard.up('searchContainer').getController().toggleInitView();
            resultCard.up('searchResult').getController().openCompany(id);
        },

        /**
         * @private
         * @return {Ext.Component} Компонент.
         */
        getMainTabPanel: function () {
            if (Ext.isClassic) {
                return A.getCmp('#mainTabPanel');
            } else {
                return A.getCmp('mainTabPanel');
            }
        },

        /**
         * @private
         * @return {Ext.Component} Компонент.
         */
        getResultCardTabPanel: function () {
            return A.getCmp('#resultCard');
        }
    }
});
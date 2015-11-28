/**
 * Абстрактный контроллер результатов поиска.
 */
Ext.define('A.view.main.company.AbstractSearchResultController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'A.store.Company'
    ],

    control: {
        '#searchResult': {
            itemclick: 'openCompanyFromClassic',
            itemtap: 'openCompanyFromModern'
        },
        'companyContainer #backToSearch': {
            tap: 'backToSearch',
            click: 'backToSearch'
        }
    },

    /**
     * @protected
     * Открывает компанию, соответствующую данным рекорда.
     * @param {Ext.data.Model} record Рекорд.
     */
    openCompany: function (record) {
        this.loadCompany(record);
        this.showCompany();
    },

    /**
     * @protected
     * Загружает данные компании на основании указанного рекорда.
     * @param {Ext.data.Model} record Рекорд.
     */
    loadCompany: function (record) {
        /*A.store.Company.load({
            params: {
                id: record.get('id')
            }
        });*/
    },

    /**
     * @protected
     * Показывает компанию.
     */
    showCompany: function () {
        this.hideSearch();
        this.switchToCompany();
    },

    /**
     * @protected
     * Возвращает к результатам поиска.
     */
    backToSearch: function () {
        this.showSearch();
        this.switchToSearch();
    },

    /**
     * @protected
     * Показывает поисковый виджет.
     */
    showSearch: function () {
        this.getSearchToolbar().show();
    },

    /**
     * @protected
     * Прячет поисковый виджет.
     */
    hideSearch: function () {
        this.getSearchToolbar().hide();
    },

    /**
     * @protected
     * Переключает отображение на показ виджета компании.
     */
    switchToCompany: function () {
        this.getResultCard().setActiveItem(1);
    },

    /**
     * @protected
     * Переключает отображение на показ виджета результатов поиска.
     */
    switchToSearch: function () {
        this.getResultCard().setActiveItem(0);
    },

    /**
     * @protected
     * @return {Ext.toolbar.Toolbar/Ext.Toolbar} Тулбар поиска.
     */
    getSearchToolbar: function () {
        return this.getView().down('#searchToolbar');
    },

    /**
     * @protected
     * @return {Ext.container.Container/Ext.Container} Контейнер с результатом поиска и деталями
     * компании с возможностью переключения отображения.
     */
    getResultCard: function () {
        return this.getView().down('#resultCard');
    },

    privates: {

        /**
         * @private
         * @param {} view Вью.
         * @param {Ext.data.Model} record Рекорд.
         */
        openCompanyFromClassic: function (view, record) {
            this.openCompany(record);
        },

        /**
         * @private
         * @param {} view Вью.
         * @param {Number} index Индекс.
         * @param {} target Цель.
         * @param {Ext.data.Model} record Рекорд.
         */
        openCompanyFromModern: function (view, index, target, record) {
            this.openCompany(record);
        }
    }
});
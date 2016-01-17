/**
 * Абстрактный контроллер результатов поиска.
 */
Ext.define('A.view.main.company.AbstractSearchResultController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'A.model.Company'
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
     * Открывает компанию, соответствующую данным рекорда или по ID.
     * @param {Ext.data.Model/Number} recordOrId Рекорд или ID.
     */
    openCompany: function (recordOrId) {
        var id = recordOrId;

        if (recordOrId instanceof Ext.data.Model) {
            id = recordOrId.get('id');
        }

        this.loadCompany(id, this.showCompany);
    },

    /**
     * @protected
     * Открывает компанию, соответствующую ID.
     * @param {Number} id ID.
     * @param {Function} callback Следующий шаг.
     */
    loadCompany: function (id, callback) {
        var container = this.getView().down('companyContainer');
        var viewModel = container.getViewModel();
        var record = viewModel.getCompanyModel();

        viewModel.set('_id', id);
        record.load({
            params: {
                id: id
            },
            callback: function () {
                viewModel.applyDataFromModel();
                callback.call(this);
            }.bind(this)
        });
    },

    /**
     * @protected
     * Показывает компанию.
     */
    showCompany: function () {
        this.hideSearch();
        this.resetCompanyTabPanel();
        this.switchToCompany();
        this.loadReviews();
    },

    /**
     * @protected
     * Возвращает к результатам поиска.
     */
    backToSearch: function () {
        this.showSearch();
        this.switchToSearch();
        this.fixAndroidAutoFocus();
        this.fixScrollFreeze();
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
     * Сбрасывает вкладки деталей компании на первую.
     */
    resetCompanyTabPanel: function () {
        Ext.each(this.getCompanyDetailsTabPanels(), function (tabPanel) {
            this.resetCompanyActiveTabNum(tabPanel);
            this.resetCompanyTabsScroll(tabPanel);
            this.resetCompanyTabsGallery(tabPanel);
        }, this);
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
     * Загружает отзывы в список отзывов.
     */
    loadReviews: function () {
        var list = this.getView().down('#reviewsList');
        var companyContainer = list.up('companyContainer');

        list.setStore(companyContainer.getViewModel().get('reviews'));
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

    /**
     * @protected
     * @return {Ext.tab.Panel[]} Все панели вкладок с деталями компании.
     */
    getCompanyDetailsTabPanels: function () {
        return A.getAllCmp('[companyDetailsTabPanel]');
    },

    /**
     * @protected
     * Отлипает скролл результатов поиска.
     */
    fixScrollFreeze: function () {
        if (Ext.isClassic) {
            return;
        }

        var result = this.getResultCard();

        Ext.defer(function () {
            result.hide();
            Ext.defer(function () {
                result.show();
            }, 100);
        }, 550);
    },

    privates: {

        /**
         * @private
         * @param {Ext.view.View} view Вью.
         * @param {Ext.data.Model} record Рекорд.
         */
        openCompanyFromClassic: function (view, record) {
            this.openCompany(record);
        },

        /**
         * @private
         * @param {Ext.dataview.DataView} view Вью.
         * @param {Number} index Индекс.
         * @param {Ext.dataview.component.DataItem} target Цель.
         * @param {Ext.data.Model} record Рекорд.
         */
        openCompanyFromModern: function (view, index, target, record) {
            this.openCompany(record);
        },

        /**
         * @private
         * @param {Ext.tab.Panel} tabPanel Панель вкладок компании.
         */
        resetCompanyActiveTabNum: function (tabPanel) {
            if (Ext.isClassic) {
                tabPanel.setActiveTab(0);
            } else {
                tabPanel.setActiveItem(0);
            }
        },

        /**
         * @private
         * @param {Ext.tab.Panel} tabPanel Панель вкладок компании.
         */
        resetCompanyTabsScroll: function (tabPanel) {
            Ext.each([
                tabPanel.down('#summary'),
                tabPanel.down('#reviews')
            ], function (component) {
                if (Ext.isClassic) {
                    this.resetClassicScroll(component);
                } else {
                    this.resetModernScroll(component);
                }
            }, this);
        },

        /**
         * @private
         * @param {Ext.Component} component Компонент.
         */
        resetClassicScroll: function (component) {
            component.scrollTo(0, 0);
        },

        /**
         * @private
         * @param {Ext.Component} component Компонент.
         */
        resetModernScroll: function (component) {
            var scroller = component.getScrollable();

            if (scroller) {
                scroller.scrollTo({x: 0, y: 0});
            }
        },

        /**
         * @private
         * @param {Ext.tab.Panel} tabPanel Панель вкладок компании.
         */
        resetCompanyTabsGallery: function (tabPanel) {
            // @TODO
        },

        /**
         * @private
         */
        fixAndroidAutoFocus: function () {
            if (Ext.isClassic) {
                return;
            }

            Ext.defer(function () {
                this.getSearchToolbar().down('#searchInput').blur();
            }, 10, this);
        }
    }
});
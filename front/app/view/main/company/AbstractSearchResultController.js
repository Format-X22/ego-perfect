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
        },

        'companyContainer #backToSearchFromAdmin': {
            click: 'backToSearchFromAdmin'
        },

        'companyContainer #backToAdmin': {
            click: 'backToAdmin'
        }
    },

    config: {

        /**
         * @cfg {Object} lastScrollPosition Последняя позиция скролла.
         */
        lastScrollPosition: null
    },

    /**
     * Скроллит на последнюю сохраненную позицию если сейчас классический режим.
     */
    scrollToLastPositionIfClassic: function () {
        if (!Ext.isClassic) {
            return;
        }

        var container = this.getScrollContainer();
        var position = this.getLastScrollPosition();

        container.scrollTo(position);
    },

    /**
     * Ничего не найдено?
     * @return {Boolean} Результат проверки.
     */
    isNoSearchResult: function () {
        return !A.store.Search.getCount();
    },

    /**
     * @protected
     * Открывает компанию, соответствующую данным рекорда или по ID.
     * @param {Ext.data.Model/Number} recordOrId Рекорд или ID.
     */
    openCompany: function (recordOrId) {
        var id = recordOrId;
        var detailsTab = this.getCompanyDetailsTabPanels()[0];
        var main = detailsTab.up('appMain');

        if (recordOrId instanceof Ext.data.Model) {
            id = recordOrId.get('company');
        }

        if (Ext.isClassic) {
            detailsTab.setLoading(true);
        } else {
            main.mask({
                xtype: 'loadmask',
                message: 'Загрузка...'
            });
        }

        this.saveCurrentScroll();
        this.showCompany();
        this.loadCompany(id, function () {
            if (Ext.isClassic) {
                detailsTab.setLoading(false);
            } else {
                main.unmask();
            }

            A.Router.changePathTo('company-' + id);
        });
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
                container.notifyCompanyLoad();
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
        this.scrollToLastPositionIfClassic();

        A.Router.changePathTo('root-search');
    },

    /**
     * @protected
     * Возвращает к результатам поиска при переходе из админки.
     * @param {Ext.button.Button} button Кнопка возврата.
     */
    backToSearchFromAdmin: function (button) {
        this.toggleAdminButtons(button);
        
        this.backToSearch();
    },

    /**
     * @protected
     * Возвращает в админку.
     * @param {Ext.button.Button} button Кнопка возврата.
     */
    backToAdmin: function (button) {
        this.toggleAdminButtons(button);
        this.backToSearch();
        
        A.getCmp('appMain').setActiveItem(1);
        A.Router.changePathTo('company-client');
    },

    /**
     * @protected
     * @param {Ext.button.Button} button Кнопка-инициатор.
     */
    toggleAdminButtons: function (button) {
        button.hide();
        button.up().down('#backToAdmin').hide();
        button.up().down('#backToSearchFromAdmin').hide();
        button.up().down('#backToSearch').show();
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

        var scrollContainer = this.getView().down('#searchResultContainer');
        var scroll = scrollContainer.getScrollable();
        var position = this.getLastScrollPosition();
        
        Ext.defer(function () {
            scroll.scrollTo(position);
            scroll.refresh(true);
        }, 550, this);
    },

    /**
     * @protected
     * Перепасовывает вызов поиска на соответствующий контроллер поиска -
     * {@link A.view.main.company.AbstractAllSearchController}.
     */
    modernKeyboardSearch: function () {
        A.getCmp('searchContainer').getController().search();
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
         */
        fixAndroidAutoFocus: function () {
            if (Ext.isClassic) {
                return;
            }

            Ext.defer(function () {
                this.getSearchToolbar().down('#searchInput').blur();
            }, 10, this);
        },

        /**
         * @private
         */
        saveCurrentScroll: function () {
            var container = this.getScrollContainer();
            var position = container.getScrollable().getPosition();
            
            this.setLastScrollPosition(Ext.clone(position));
        },

        /**
         * @private
         * @return {Ext.Container} Контейнер для скрола.
         */
        getScrollContainer: function () {
            var view = this.getView();

            if (Ext.isClassic) {
                return view.down('#resultCardScrollContainer');
            } else {
                return view.down('#searchResultContainer');
            }
        }
    }
});
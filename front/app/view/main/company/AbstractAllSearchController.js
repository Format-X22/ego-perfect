/**
 * Абстрактный контроллер виджетов поиска.
 */
Ext.define('A.view.main.company.AbstractAllSearchController', {
    extend: 'Ext.app.ViewController',

    requires: [
         'A.store.Search'
    ],

    control: {
        '#searchResult': {
            show: 'showHelpClassicIfNeed'
        },
        '#resultCard': {
            activeitemchange: 'showHelpModernFromCompanyTab'
        },
        '#searchInput': {
            change: 'syncAllSearchInputs'
        },
        '#searchButton': {
            tap: 'search',
            click: 'search'
        }
    },

    /**
     * Показывает окно подсказки о том что нужно нажимать
     * на квадраты, для десктопа.
     */
    showHelpClassicIfNeed: function () {
        if (!Ext.isClassic) {
            return;
        }
        
        Ext.defer(function () {
            var view = this.getView();
            var resultContainer = view.down('#searchResult #resultCard #resultCardScrollContainer');
            var resultContainerVisible = !resultContainer.isHidden();

            if (resultContainerVisible) {
                Ext.widget('searchHelpWindow').showAt(10, 100);
            }
        }, 1, this);
    },

    /**
     * Показывает окно подсказки о том что нужно нажимать
     * на квадраты, для модерна.
     */
    showHelpModern: function () {
        Ext.widget('searchHelpWindow').tryShow();
    },

    /**
     * Показывает окно подсказки о том что нужно нажимать
     * на квадраты, для модерна.
     * Отрабатывает в случае если пользователь пришел
     * со страницы деталей компании, но на сайте впервые.
     */
    showHelpModernFromCompanyTab: function (cardContainer, card) {
        if (!Ext.isClassic) {
            if (card.getItemId() === 'searchResultContainer') {
                this.showHelpModern();
            }
        }
    },

    /**
     * Синхронизирует все поля поиска.
     * @param {Ext.form.field.Text} originInput Поле-инициатор.
     * @param {String} value Значение поля
     */
    syncAllSearchInputs: function (originInput, value) {
        var inputs = this.getSearchInputs();

        Ext.Array.each(inputs, function (input) {
            input.setValue(value);
        });
    },

    /**
     * Запускает поиск.
     */
    search: function () {
        if (!Ext.isClassic && !this.getSearchValue()) {
            return;
        }

        this.toggleInitView();
        this.sendQuery();
        this.resetResultScrollPosition();

        if (Ext.isClassic) {
            Ext.defer(this.scrollClassicToTop, 300, this);
        }

        if (!Ext.isClassic) {
            this.showHelpModern();
        }
    },

    /**
     * @template
     * @protected
     * @method toggleInitView
     * Метод, в котором должна содержаться логика переключения с вью
     * начального поиска на вью поиска с результатами.
     */
    toggleInitView: Ext.emptyFn,

    privates: {

        /**
         * @private
         * @return {Ext.form.field.Text[]} Поля поиска.
         */
        getSearchInputs: function () {
            return A.getAllCmp('#searchInput');
        },

        /**
         * @private
         */
        sendQuery: function () {
            var value = this.getSearchValue();

            A.store.Search.load({
                params: {
                    query: value || ''
                }
            });
        },

        /**
         * @private
         */
        resetResultScrollPosition: function () {
            A.getCmp('searchResult').getController().setLastScrollPosition({x: 0, y: 0});
        },

        /**
         * @private
         */
        scrollClassicToTop: function () {
            A.getCmp('searchResult').getController().scrollToLastPositionIfClassic();
        },

        /**
         * @private
         * @return {String/Null} Значение поиска.
         */
        getSearchValue: function () {
            return this.getSearchInputs()[0].getValue();
        }
    }
});
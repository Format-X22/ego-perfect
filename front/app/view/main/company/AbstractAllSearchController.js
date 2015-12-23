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
            show: 'showHelpClassic'
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
    showHelpClassic: function () {
        if (Ext.isClassic) {
            Ext.widget('searchHelpWindow').showAt(10, 100);
        }
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
        this.toggleInitView();
        this.sendQuery();

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
            var value = this.getSearchInputs()[0].getValue();

            A.store.Search.load({
                params: {
                    query: value || ''
                }
            });
        }
    }
});
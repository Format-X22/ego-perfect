/**
 * Абстрактный контроллер виджетов поиска.
 */
Ext.define('A.view.main.company.AbstractAllSearchController', {
    extend: 'Ext.app.ViewController',

    requires: [
         'A.store.Search'
    ],

    control: {
        '#searchInput': {
            change: 'syncAllSearchInputs'
        },
        '#searchButton': {
            tap: 'search',
            click: 'search'
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

            /*A.store.Search.load({
             params: {
             query: value || ''
             }
             });*/
        }
    }
});
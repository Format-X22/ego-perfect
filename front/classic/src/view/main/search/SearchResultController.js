/**
 * Контроллер виджета результатов поиска.
 */
Ext.define('A.view.main.search.SearchResultController', {
    extend: 'A.view.main.company.AbstractSearchResultController',
    alias: 'controller.searchResult',

    /**
     * Устанавливаем фокус на поле поиска,
     * делегируем это действие контроллеру поиска.
     * @param {Ext.Component} component Компонент-инициатор.
     */
    focusSearchInput: function (component) {
        this.getAllSearchController().focusSearchInput(component);
    },

    /**
     * Начинаем поиск если нажата кнопка Enter,
     * делегируем это действие контроллеру поиска.
     * @param {Ext.form.field.Text} field Поле ввода.
     * @param {Ext.event.Event} event Эвент.
     */
    searchIfEnter: function (field, event) {
        this.getAllSearchController().searchIfEnter(field, event);
    },

    privates: {

        /**
         * @private
         * @return {Ext.app.ViewController} Контроллер поиска.
         */
        getAllSearchController: function () {
            return this.getView().up('searchContainer').getController();
        }
    }
});
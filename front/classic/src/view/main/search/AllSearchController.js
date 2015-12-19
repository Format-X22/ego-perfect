/**
 * Контроллер всего что относится к поиску.
 */
Ext.define('A.view.main.search.AllSearchController', {
    extend: 'A.view.main.company.AbstractAllSearchController',
    alias: 'controller.allSearch',

    toggleInitView: function () {
        Ext.ComponentQuery.query('startDesktopSearch')[0].hide();
        Ext.ComponentQuery.query('searchResult')[0].show();
    },

    /**
     * Устанавливаем фокус на поле поиска.
     * @param {Ext.Component} component Компонент-инициатор.
     */
    focusSearchInput: function (component) {
        if (component.getItemId() === 'searchInput') {
            component.focus();
        } else {
            component.down('#searchInput').focus();
        }
    },

    /**
     * Начинаем поиск если была нажата кнопка Enter.
     * @param {Ext.form.field.Text} field Поле ввода.
     * @param {Ext.event.Event} event Эвент.
     */
    searchIfEnter: function (field, event) {
        if (event.getKey() === event.ENTER) {
            this.search();
        }
    }
});
/**
 * Единый контроллер всех виджетов поиска.
 * Един по причине полной схожести действий для мобильных и планшетных устройств.
 */
Ext.define('A.view.main.search.AllSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.allSearchController',

    control: {
        '#searchInput': {
            change: 'syncAllSearchInputs'
        },
        '#searchButton': {
            tap: 'search'
        }
    },

    /**
     * Синхронизируем все инпуты поиска при вводе данных.
     * @param {Ext.field.Text} originInput Поле-инициатор изменений.
     * @param {String} value Значение поля-инициатора.
     */
    syncAllSearchInputs: function (originInput, value) {
        var inputs = Ext.ComponentQuery.query('#searchInput');

        Ext.Array.each(inputs, function (input) {
            input.setValue(value);
        });
    },

    /**
     * Запуск поиска по тапу на кнопку поиска.
     */
    search: function () {
        Ext.ComponentQuery.query('startMobileSearch')[0].hide();
        Ext.ComponentQuery.query('startTabletSearch')[0].hide();
        Ext.ComponentQuery.query('searchResult')[0].show();
    }
});
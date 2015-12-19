/**
 * Контроллер верхнего тулбара для клиентов.
 */
Ext.define('A.view.client.TopToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.clientTopToolbar',

    /**
     * Перейти на страницу поиска, главную страницу сайта.
     */
    toSearch: function () {
        this.redirectTo('search');
    },

    /**
     * Перейти на страницу деталей этой компании.
     */
    toDetails: function () {
        console.log('to details');
    },

    /**
     * Зарелизить изменения компании.
     * Используется только в самом начале чтобы указать
     * на тот факт что услуга пока ещё не оплачена.
     */
    release: function () {
        console.log('release');
    },

    /**
     * Выйти из панели управления.
     */
    exit: function () {
        console.log('exit');
        this.toSearch();
    }
});
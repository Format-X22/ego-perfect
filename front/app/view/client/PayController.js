/**
 * Контроллер платежей клиента.
 */
Ext.define('A.view.client.PayController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.clientPay',

    /**
     * Оплата на 1 месяц.
     */
    pay1Month: function () {
        alert('Оплата будет доступна после 1 июня (1)');
    },

    /**
     * Оплата на 12 месяцев.
     */
    pay12Month: function () {
        alert('Оплата будет доступна после 1 июня (12)');
    }
});
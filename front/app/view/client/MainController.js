/**
 * Контроллер админки клиента.
 */
Ext.define('A.view.client.MainController', {
    extend: 'A.view.admin.MainController',
    alias: 'controller.clientMain',

    requires: [
        'A.model.Client'
    ],

    getId: function () {
        return 'BBB'; // @TODO
    },

    getModelClassName: function () {
        return 'A.model.Client';
    }
});
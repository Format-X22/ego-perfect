/**
 * Контроллер админки клиента.
 */
Ext.define('A.view.client.MainController', {
    extend: 'A.view.admin.MainController',
    alias: 'controller.clientMain',

    requires: [
        'A.model.Client'
    ],

    getModelClassName: function () {
        return 'A.model.Client';
    }
});
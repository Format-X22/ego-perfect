/**
 * Контроллер профиля клиента.
 */
Ext.define('A.view.client.ProfileController', {
    extend: 'A.view.admin.AbstractProfileController',
    alias: 'controller.clientProfile',

    getId: function () {
        return 'AAA'; // @TODO
    }
});
/**
 * Контроллер профиля партнера.
 */
Ext.define('A.view.partner.ProfileController', {
    extend: 'A.view.admin.AbstractProfileController',
    alias: 'controller.partnerProfile',

    getId: function () {
        return 'AAA'; // @TODO
    }
});
/**
 * Контроллер админки партнера.
 */
Ext.define('A.view.partner.MainController', {
    extend: 'A.view.admin.MainController',
    alias: 'controller.partnerMain',

    requires: [
        'A.model.Partner'
    ],

    getId: function () {
        return 'AAA'; // @TODO
    },

    getModelClassName: function () {
        return 'A.model.Partner';
    }
});
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
        return '568d7033afba7c850caaad19'; // @TODO
    },

    getModelClassName: function () {
        return 'A.model.Partner';
    },

    isStatsExits: function () {
        return Boolean(this.getRecord().get('totalStats').count());
    },

    applyDataToCharts: function () {
        var view = this.getView();
        var record = this.getRecord();

        view.down('partnerStatisticTotal #chart').setStore(record.get('totalStats'));
        view.down('partnerStatisticClients #chart').setStore(record.get('clientsStats'));
        view.down('partnerStatisticPartners #chart').setStore(record.get('partnersStats'));
        view.down('partnerStatisticIncome #chart').setStore(record.get('incomeStats'));
    }
});
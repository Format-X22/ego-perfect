/**
 * Контроллер админки партнера.
 */
Ext.define('A.view.partner.MainController', {
    extend: 'A.view.admin.MainController',
    alias: 'controller.partnerMain',

    requires: [
        'A.model.Partner'
    ],

    /**
     * @inheritdoc
     */
    getModelClassName: function () {
        return 'A.model.Partner';
    },

    /**
     * @inheritdoc
     */
    isStatsExits: function () {
        return Boolean(this.getRecord().get('totalStats').count());
    },

    /**
     * @inheritdoc
     */
    applyDataToCharts: function () {
        var view = this.getView();
        var record = this.getRecord();

        view.down('partnerStatisticTotal #chart').setStore(record.get('totalStats'));
        view.down('partnerStatisticClients #chart').setStore(record.get('clientsStats'));
        view.down('partnerStatisticPartners #chart').setStore(record.get('partnersStats'));
        view.down('partnerStatisticIncome #chart').setStore(record.get('incomeStats'));
    }
});
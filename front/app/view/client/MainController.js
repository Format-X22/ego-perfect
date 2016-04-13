/**
 * Контроллер админки клиента.
 */
Ext.define('A.view.client.MainController', {
    extend: 'A.view.admin.MainController',
    alias: 'controller.clientMain',

    requires: [
        'A.model.Client'
    ],

    /**
     * @inheritdoc
     */
    getModelClassName: function () {
        return 'A.model.Client';
    },

    /**
     * @inheritdoc
     */
    isStatsExits: function () {
        return Boolean(this.getRecord().get('ratingStat').count());
    },

    /**
     * @inheritdoc
     */
    applyDataToCharts: function () {
        var view = this.getView();
        var record = this.getRecord();

        view.down('clientStatisticRating #chart').setStore(record.get('ratingStat'));
        view.down('clientStatisticViews #chart').setStore(record.get('viewsStat'));
        view.down('clientStatisticReviews #chart').setStore(record.get('reviewsStat'));
        view.down('clientStatisticStars #chart').setStore(record.get('starsStat'));
    }
});
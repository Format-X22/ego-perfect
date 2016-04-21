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
     * Обновляет ссылку с ключем до текущего ключа.
     * Необходимо при загрузке данных партнера.
     */
    updateKeyLink: function () {
        var keyPage = this.getView().down('partnerKey');
        var idField = keyPage.down('#id');
        var linkField = keyPage.down('#link');
        var id = idField.getValue();

        linkField.setValue('http://фирмы.онлайн/#rootPage/register/' + id);
        
    },

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
        var total = this.getRecord().get('totalStat');
        
        if (total.count()) {
            return Boolean(total.getAt(0).get('count') || total.getAt(1).get('count'));
        } else {
            return false;
        }
    },

    /**
     * @inheritdoc
     */
    applyDataToCharts: function () {
        var view = this.getView();
        var record = this.getRecord();

        view.down('partnerStatisticTotal #chart').setStore(record.get('totalStat'));
        view.down('partnerStatisticClients #chart').setStore(record.get('clientsStat'));
        view.down('partnerStatisticPartners #chart').setStore(record.get('partnersStat'));
        view.down('partnerStatisticIncome #chart').setStore(record.get('moneyStat'));
    }
});
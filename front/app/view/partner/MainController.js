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
        var registerLinkField = keyPage.down('#register');
        var id = idField.getValue();

        linkField.setValue('http://фирмы.онлайн/page-key-' + id);
        registerLinkField.setValue('http://фирмы.онлайн/page-root-register-' + id);
        
    },

    /**
     * Переключает видимость подсказки необходимости заключения договора.
     */
    updateContractHint: function () {
        var view = this.getView();
        var isActive = view.down('#activeFlag').getValue();
        var hint = view.down('#contractHint');
        
        if (isActive) {
            hint.hide();
        } else {
            hint.show();
        }
    },

    /**
     * Установка данных актов.
     */
    applyActsData: function () {
        var view = this.getView();
        var record = this.getRecord();
        
        view.down('partnerActs #clientsPayGrid').setStore(record.get('actsData'));
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
    applyLoadedData: function () {
        this.callParent(arguments);
        this.applyActsData();
    },

    /**
     * @inheritdoc
     */
    applyDataToCharts: function () {
        var view = this.getView();
        var record = this.getRecord();
        
        view.down('partnerStatisticClients #chart').setStore(record.get('clientsStat'));
        view.down('partnerStatisticIncome #chart').setStore(record.get('moneyStat'));
    }
});
/**
 * Контроллер админки клиента.
 */
Ext.define('A.view.client.MainController', {
    extend: 'A.view.admin.MainController',
    alias: 'controller.clientMain',

    requires: [
        'A.model.Client'
    ],

    config: {
        /**
         * @private
         * @cfg {Boolean} isForceChangeEditorTab
         * Указывает что необходимо сменить вкладку редактора даже если данные не сохранены.
         */
        isForceChangeEditorTab: false
    },
    
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
    },

    /**
     * Проверяет на сохраненнность вкладку редактора.
     * @return {Boolean} False если данные не сохранены.
     */
    checkEditorSaveOnTabChange: function (tabPanel, newTab, oldTab) {
        var force = this.getIsForceChangeEditorTab();

        this.setIsForceChangeEditorTab(false);
        
        if (force || !oldTab.isDirty()) {
            return true;
        }

        Ext.MessageBox.confirm(
            'Сохранение',
            'Данные не сохранены, сделать это сейчас?',
            function (buttonId) {
                this.handleSaveDialogOnTabChange(buttonId, newTab, oldTab);
            },
            this
        );

        return false;
    },

    /**
     * @private
     * @param {String} buttonId Текстовый идентификатор кнопки.
     * @param {Ext.Component} goTab Вкладка для перехода.
     * @param {Ext.Component} saveTab Вкладка для сохранения.
     */
    handleSaveDialogOnTabChange: function (buttonId, goTab, saveTab) {
        var saveButton;
        
        if (buttonId === 'yes') {
            saveButton = saveTab.down('widgetSaveToolbar #save');
            
            saveTab.getController().save(saveButton);
        } else {
            this.setIsForceChangeEditorTab(true);
            goTab.up().setActiveTab(goTab);
        }
    }
});
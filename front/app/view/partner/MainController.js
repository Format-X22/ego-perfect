/**
 * Контроллер вью партнера.
 */
Ext.define('A.view.partner.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.partnerMain',

    requires: [
        'A.model.Partner'
    ],

    config: {
        record: null
    },

    /**
     * Загружает данные партнера.
     */
    loadData: function () {
        this.applyRecordIfNeed();

        this.getRecord().set('id', 'AAA'); // @TODO Partner ID
        this.getRecord().load({
            success: this.applyLoadedData,
            scope: this
        });
    },

    privates: {

        /**
         * @private
         */
        applyRecordIfNeed: function () {
            if (!this.getRecord()) {
                this.setRecord(Ext.create('A.model.Partner'));
            }
        },

        /**
         * @private
         */
        applyLoadedData: function () {
            this.getView().loadRecord(this.getRecord());
            // @TODO Загружать данные в графики, прятать заменители места.
        }
    }
});
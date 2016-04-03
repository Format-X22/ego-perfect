/**
 * Абстрактный контроллер админки.
 * Требует имплементации методов
 * {@link #getModelClassName},
 * {@link #isStatsExits},
 * {@link #applyDataToCharts}.
 */
Ext.define('A.view.admin.MainController', {
    extend: 'Ext.app.ViewController',

    config: {

        /**
         * @cfg {Ext.data.Model} record Модель данных.
         */
        record: null
    },

    /**
     * Загружает данные партнера.
     */
    loadData: function () {
        this.applyRecordIfNeed();

        this.getRecord().load({
            success: this.applyLoadedData,
            scope: this
        });
    },

    /**
     * @protected
     * @method getModelClassName
     * @required
     * @template
     * @return {String} Имя модели данных админки.
     */
    getModelClassName: Ext.emptyFn,

    /**
     * @protected
     * @method isStatsExits
     * @required
     * @template
     * @return {Boolean} Имеется ли какая-либо статистика.
     */
    isStatsExits: Ext.emptyFn,

    /**
     * @protected
     * @method applyDataToCharts
     * @required
     * @template
     */
    applyDataToCharts: Ext.emptyFn,

    privates: {

        /**
         * @private
         */
        applyRecordIfNeed: function () {
            if (!this.getRecord()) {
                this.setRecord(Ext.create(this.getModelClassName()));
            }
        },

        /**
         * @private
         */
        applyLoadedData: function () {
            var view = this.getView();
            var fields = A.getAllCmp('field', view);

            view.loadRecord(this.getRecord());

            Ext.each(fields, function (field) {
                field.originalValue = field.getValue();
            }, this);

            if (this.isStatsExits()) {
                this.applyDataToCharts();
                this.showCharts();
            }
        },

        /**
         * @private
         */
        showCharts: function () {
            var root = this.getView();
            var placeholders = A.getAllCmp('#placeholder', root);
            var charts = A.getAllCmp('#chart', root);

            Ext.each(placeholders, function (placeholder) {
                placeholder.hide();
            });

            Ext.each(charts, function (chart) {
                chart.show();
            });
        }
    }
});
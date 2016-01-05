/**
 * Абстрактный контроллер админки.
 * Требует имплементации метода {@link #getId}
 * и метода {@link #getModelClassName}.
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

        this.getRecord().set('id', this.getId());
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
     * @method getId
     * @required
     * @template
     * @return {String} ID профиля.
     */
    getId: Ext.emptyFn,

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
            this.getView().loadRecord(this.getRecord());
            // @TODO Загружать данные в графики, прятать заменители места.
        }
    }
});
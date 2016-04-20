/**
 * Абстрактный контроллер тулбара сохранения.
 * Предназначен для различных форм с сохранением
 * через соответствующий тулбар.
 */
Ext.define('A.view.widget.AbstractSaveToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.widgetSaveToolbar',

    mixins: [
        'A.view.widget.FormSaveMessagesMixin'
    ],

    /**
     * @cfg {String} url Ссылка отправки формы при сохранении.
     */
    url: '',

    /**
     * Сохранение формы.
     * @param {Ext.button.Button} button Кнопка сохранения.
     */
    save: function (button) {
        var form = button.up('form');

        form.mask();

        form.submit({
            clientValidation: true,
            submitEmptyText: false,
            url: this.url,
            success: function () {
                this.resetForm(form);
                this.showSuccessSaveMessage();
                form.unmask();
            }.bind(this),
            failure: function () {
                this.showFailureSaveMessage.apply(this, arguments);
                form.unmask();
            }.bind(this)
        });
    },

    /**
     * Сброс формы.
     * @param {Ext.button.Button} button Кнопка сброса.
     */
    reset: function (button) {
        var form = button.up('form');

        form.reset();
        this.toggleSaveToolbar(form, false);
    },

    /**
     * Переключает состояние тулбара сохранения в зависимости от состояния измененности данных.
     * @param {Ext.form.Form} form Форма.
     * @param {Boolean} dirty Состояние измененности.
     */
    toggleSaveToolbar: function (form, dirty) {
        var toolbar = this.getView().down('widgetSaveToolbar');
        
        toolbar.down('#save').setDisabled(!dirty);
        toolbar.down('#reset').setDisabled(!dirty);
    },

    privates: {

        /**
         * @private
         * @param {Ext.form.Panel} form Форма.
         */
        resetForm: function (form) {
            var fields = A.getAllCmp('field', form);
            var htmlEditors = A.getAllCmp('htmleditor', form);

            [].push.apply(fields, htmlEditors);

            Ext.each(fields, function (field) {
                field.resetOriginalValue();
            }, this);
        }
    }
});
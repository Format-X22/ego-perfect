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
                this.showSuccessSaveMessage();
                form.unmask();
            }.bind(this),
            failure: function () {
                this.showFailureSaveMessage();
                form.unmask();
            }.bind(this)
        });
    },

    /**
     * Сброс формы.
     * @param {Ext.button.Button} button Кнопка сброса.
     */
    reset: function (button) {
        button.up('form').reset();
    }
});
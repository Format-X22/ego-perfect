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
        button.up('form').submit({
            clientValidation: true,
            url: this.url,
            success: this.showSuccessSaveMessage.bind(this),
            failure: this.showFailureSaveMessage.bind(this)
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
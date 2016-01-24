/**
 * Абстрактный контроллер системы авторизации.
 */
Ext.define('A.view.main.auth.AbstractAuthController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'A.view.widget.FormSaveMessagesMixin'
    ],

    config: {

        /**
         * @cfg {String} url Адрес отправки данных.
         */
        url: ''
    },

    /**
     * Пытается отправить форму.
     */
    trySend: function () {
        this.getView().submit({
            clientValidation: true,
            url: this.getUrl(),
            success: this.goToPage.bind(this),
            failure: this.showFailureSaveMessage.bind(this)
        });
    },

    /**
     * @template
     * Перенаправляет на указанную страницу.
     */
    goToPage: Ext.emptyFn
});
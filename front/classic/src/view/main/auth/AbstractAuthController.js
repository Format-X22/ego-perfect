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
        var view = this.getView();

        view.mask();
        view.submit({
            clientValidation: true,
            url: this.getUrl(),
            callback: view.unmask.bind(view),
            success: function () {
                this.goToPage();
                view.unmask();
            }.bind(this),
            failure: function () {
                this.showFailureSaveMessage.apply(this, arguments);
                view.unmask();
            }.bind(this)
        });
    },

    /**
     * Пытается отправить форму если была нажата клавиша Enter.
     * @param {Ext.form.field.Base} field Поле ввода.
     * @param {Ext.event.Event} event Объект эвента.
     */
    trySendIfEnterKey: function (field, event) {
        if (event.getKey() === event.ENTER) {
            this.trySend();
        }
    },

    /**
     * Перенаправляет на страницу аккаунта.
     */
    goToPage: function () {
        var type = this.getView().getValues().type;
        var accPage = 0;
        var accHash = '';

        if (type === 'company') {
            accPage = 1;
            accHash = '#client';
        } else if (type === 'partner') {
            accPage = 2;
            accHash = '#partner';
        }

        A.getCmp('appMain').setActiveItem(accPage);
        this.redirectTo(accHash);
        this.getView().reset();
    }
});
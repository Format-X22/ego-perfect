/**
 * Управляет процессом регистрации.
 */
Ext.define('A.view.main.auth.RegisterPageController', {
    extend: 'A.view.main.auth.AbstractAuthController',
    alias: 'controller.mainAuthRegisterPage',

    url: '/api/auth/register',

    /**
     * Пытается отправить форму.
     */
    trySend: function () {
        var type = this.getView().getValues().type;

        if (type === 'company') {
            this.showClientOffer();
        } else {
            this.send();
        }
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
     * Обновляет ключ партнера при показе страницы.
     */
    updatePartnerKeyOnShow: function () {
        var partnerKeyField = this.getView().down('#partner');
        var currentPartnerKey = partnerKeyField.getValue();
        var localStorage;
        var storedPartnerKey;

        if (currentPartnerKey) {
            return;
        }

        localStorage = Ext.util.LocalStorage.get('partnerKey');
        storedPartnerKey = localStorage.getItem('key');
        localStorage.release();

        partnerKeyField.setValue(storedPartnerKey);
    }
});
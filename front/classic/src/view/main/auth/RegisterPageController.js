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
    }
});
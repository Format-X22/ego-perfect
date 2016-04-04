/**
 * Управляет процессом входа.
 */
Ext.define('A.view.main.auth.LoginPageController', {
    extend: 'A.view.main.auth.AbstractAuthController',
    alias: 'controller.mainAuthLoginPage',

    url: '/api/auth/login',

    config: {
        restorePassUrl: '/api/auth/restorePass'
    },

    /**
     * Сбрасывает пароль.
     */
    resetPass: function () {
        var view = this.getView();

        view.mask();
        view.submit({
            clientValidation: true,
            url: this.getRestorePassUrl(),
            success: function () {
                this.showSuccessMessage('Новый пароль отправлен вам на почту.');
                view.unmask();
            }.bind(this),
            failure: function () {
                this.showFailureSaveMessage.apply(this, arguments);
                view.unmask();
            }.bind(this)
        });
    }
});
/**
 * Управляет процессом регистрации.
 */
Ext.define('A.view.main.auth.RegisterPageController', {
    extend: 'A.view.main.auth.AbstractAuthController',
    alias: 'controller.mainAuthRegisterPage',

    url: '/api/auth/register',

    /**
     * @inheritdoc
     */
    goToPage: function () {
        console.log('Go to client or partner page (register)');
        // @TODO
    }
});
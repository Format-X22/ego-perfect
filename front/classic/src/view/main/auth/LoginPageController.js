/**
 * Управляет процессом входа.
 */
Ext.define('A.view.main.auth.LoginPageController', {
    extend: 'A.view.main.auth.AbstractAuthController',
    alias: 'controller.mainAuthLoginPage',

    url: '/api/auth/login'
});
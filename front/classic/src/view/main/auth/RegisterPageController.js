/**
 * Управляет процессом регистрации.
 */
Ext.define('A.view.main.auth.RegisterPageController', {
    extend: 'A.view.main.auth.AbstractAuthController',
    alias: 'controller.mainAuthRegisterPage',

    url: '/api/auth/register'
});
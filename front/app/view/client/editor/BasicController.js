/**
 * Контроллер редактора, вкладки базовых данных.
 */
Ext.define('A.view.client.editor.BasicController', {
    extend: 'A.view.client.editor.AbstractController',
    alias: 'controller.clientEditorBasic',

    url: '/api/saveBasic'
});
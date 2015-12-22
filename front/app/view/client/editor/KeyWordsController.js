/**
 * Контроллер редактора, вкладки базовых данных.
 */
Ext.define('A.view.client.editor.KeyWordsController', {
    extend: 'A.view.client.editor.AbstractController',
    alias: 'controller.clientEditorKeyWords',

    url: '/api/saveKeyWords'
});
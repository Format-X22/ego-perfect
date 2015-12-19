/**
 * Контроллер редактора, вкладки фото.
 */
Ext.define('A.view.client.editor.PhotoController', {
    extend: 'A.view.client.editor.AbstractController',
    alias: 'controller.clientEditorPhoto',

    url: '/api/savePhoto'
});
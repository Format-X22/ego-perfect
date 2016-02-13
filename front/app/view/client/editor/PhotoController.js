/**
 * Контроллер редактора, вкладки фото.
 */
Ext.define('A.view.client.editor.PhotoController', {
    extend: 'A.view.widget.AbstractSaveToolbarController',
    alias: 'controller.clientEditorPhoto',

    url: '/api/client'
});
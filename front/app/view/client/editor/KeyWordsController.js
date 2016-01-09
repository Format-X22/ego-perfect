/**
 * Контроллер редактора, вкладки базовых данных.
 */
Ext.define('A.view.client.editor.KeyWordsController', {
    extend: 'A.view.widget.AbstractSaveToolbarController',
    alias: 'controller.clientEditorKeyWords',

    url: '/api/saveKeyWords'
});
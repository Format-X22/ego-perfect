/**
 * Контроллер редактора, вкладки описания компании.
 */
Ext.define('A.view.client.editor.SummaryController', {
    extend: 'A.view.widget.AbstractSaveToolbarController',
    alias: 'controller.clientEditorSummary',

    url: '/api/client/summary'
});
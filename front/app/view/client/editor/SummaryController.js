/**
 * Контроллер редактора, вкладки описания компании.
 */
Ext.define('A.view.client.editor.SummaryController', {
    extend: 'A.view.client.editor.AbstractController',
    alias: 'controller.clientEditorSummary',

    url: '/api/saveSummary'
});
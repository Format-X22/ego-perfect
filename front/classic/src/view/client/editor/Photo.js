/**
 * Редактор фото.
 */
Ext.define('A.view.client.editor.Photo', {
    extend: 'Ext.form.Panel',
    xtype: 'clientEditorPhoto',
    controller: 'clientEditorPhoto',

    requires: [
        'A.view.client.editor.PhotoController'
    ],

    items: [
        {
            xtype: 'clientEditorSaveToolbar'
        }
    ]
});
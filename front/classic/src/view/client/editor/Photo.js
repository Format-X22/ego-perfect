/**
 * Редактор фото.
 */
Ext.define('A.view.client.editor.Photo', {
    extend: 'Ext.form.Panel',
    xtype: 'clientEditorPhoto',

    items: [
        {
            xtype: 'clientEditorSaveToolbar'
        }
    ]
});
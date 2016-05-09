/**
 * Контроллер редактора, вкладки фото.
 */
Ext.define('A.view.client.editor.PhotoController', {
    extend: 'A.view.widget.AbstractSaveToolbarController',
    alias: 'controller.clientEditorPhoto',

    url: '/api/client/photo',

    /**
     * @inheritdoc
     */
    successSaveHandler: function () {
        var fileFields = this.getView().query('filefield');

        Ext.each(fileFields, function (field) {
            field.setRawValue('Загружено успешно!');
        }, this);

        this.callParent(arguments);
    }
});
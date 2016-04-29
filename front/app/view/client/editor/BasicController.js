/**
 * Контроллер редактора, вкладки базовых данных.
 */
Ext.define('A.view.client.editor.BasicController', {
    extend: 'A.view.widget.AbstractSaveToolbarController',
    alias: 'controller.clientEditorBasic',

    url: '/api/client/basic',

    /**
     * Валидатор для поля ввода координат.
     * @param {String} value Строка с координатами.
     * @return {Boolean/String} True если всё ок или строка с текстом ошибки.
     */
    mapValidator: function (value) {
        var allOk = true;
        var errorMessage = 'Не верный формат';

        if (!value) {
            return errorMessage;
        }

        value.replace(/\s+/, ',');
        value.replace(/,+/, ',');
        value = value.split(/[,]|[.]]/);

        Ext.each(value, function (part) {
            part = part.replace(/\D/, '');

            if (isNaN(parseInt(part))) {
                return allOk = false;
            }
        });

        if (allOk) {
            return true;
        } else {
            return errorMessage;
        }
    },

    /**
     * Показывает подсказку получения координат компании.
     */
    showCoordsHint: function () {
        var hintWindow = A.getCmp('clientEditorCoordsHintWindow');

        if (hintWindow) {
            hintWindow.on('hide', hintWindow.destroy, hintWindow);
            hintWindow.hide();
        } else {
            Ext.create('A.view.client.editor.CoordsHintWindow', {});
        }
    }
});
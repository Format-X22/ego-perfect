/**
 * Миксина, реализующая вывод сообщений об успешных и
 * не успешных попытках отправить форму.
 */
Ext.define('A.view.widget.FormSaveMessagesMixin', {
    extend: 'A.view.widget.MessagesMixin',

    /**
     * Показывает сообщение об успешном сохранении.
     * Для установки своего сообщения необходимо использовать
     * свой обработчик с методом {@link #showSuccessMessage}.
     */
    showSuccessSaveMessage: function () {
        this.showSuccessMessage('Данные успешно сохранены.');
    },

    /**
     * Показывает сообщение об не успешном сохранении.
     * Отсекает вызовы при клиентской не валидности данных.
     * @param {Ext.form.Panel} form Форма сохранения.
     * @param {Ext.form.action.Action} action Объект действия формы.
     */
    showFailureSaveMessage: function (form, action) {
        if (!action) {
            return;
        }
        
        var types = Ext.form.action.Action;
        var serverMessage = action.result && (action.result.error || action.result.message);
        var client = types.CLIENT_INVALID;
        var server = types.SERVER_INVALID;
        var connect = types.CONNECT_FAILURE || types.LOAD_FAILURE;

        switch (action.failureType) {
            case client:
                return;

            case server:
                this.showErrorMessage(serverMessage);
                return;

            case connect:
            default:
                this.showErrorMessage(this.getErrorConnectionMessage());
        }
    }
});
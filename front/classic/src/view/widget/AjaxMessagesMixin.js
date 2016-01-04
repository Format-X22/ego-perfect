/**
 * Миксина, содержащая сообщения результатов запросов на сервер в случае
 * отправки данных обычным ajax запросом.
 */
Ext.define('A.view.widget.AjaxSendMessagesMixin', {
    extend: 'A.view.widget.MessagesMixin',

    /**
     * Показывает сообщение об успешной отправке данных.
     * Для установки своего сообщения необходимо использовать
     * свой обработчик с методом {@link #showSuccessMessage}.
     */
    showSuccessSendMessage: function () {
        this.showSuccessMessage('Данные успешно отправлены.');
    },

    /**
     * Показывает сообщение об ошибке в отправке данных.
     * В случае если сервер ответил сообщением - выводится сообщение,
     * иначе выводится стандартное сообщения ошибки соединения.
     * @param {Object} response Объект ответа сервера.
     */
    showFailureSendMessage: function (response) {
        var message = this.getErrorConnectionMessage();
        var serverData = Ext.decode(response.responseText, true);

        if (serverData && serverData.error) {
            message = serverData.error;
        }

        this.showErrorMessage(message);
    }
});
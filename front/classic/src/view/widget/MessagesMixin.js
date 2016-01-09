/**
 * Миксина, содержащая вывод сообщений, включая набор типичных.
 */
Ext.define('A.view.widget.MessagesMixin', {

    config: {

        /**
         * Сообщение в случае проблем с сетью.
         */
        errorConnectionMessage: 'Проверьте подключение или попробуйте позже.'
    },

    /**
     * Показывает сообщение успешного действия.
     * @param {String} message Текст сообщения.
     */
    showSuccessMessage: function (message) {
        this.showMessage('Успешно', message , 'INFO');
    },

    /**
     * Показывает сообщение об ошибке.
     * @param {String} message Текст сообщения.
     */
    showErrorMessage: function (message) {
        this.showMessage('Ошибка', message, 'ERROR');
    },

    /**
     * Показывает сообщение.
     * @param {String} title Заголовок сообщения.
     * @param {String} message Текст сообщения.
     * @param {String} icon Имя константы иконки сообщения.
     */
    showMessage: function (title, message, icon) {
        Ext.MessageBox.show({
            title: title,
            message: message,
            icon: Ext.MessageBox[icon],
            buttons: Ext.MessageBox.OK
        });
    }
});
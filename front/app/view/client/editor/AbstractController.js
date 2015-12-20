/**
 * Абстрактный контроллер вкладок редактора.
 */
Ext.define('A.view.client.editor.AbstractController', {
    extend: 'Ext.app.ViewController',

    /**
     * @cfg {String} url Ссылка отправки формы при сохранении.
     */
    url: '',

    /**
     * Сохранение формы.
     * @param {Ext.button.Button} button Кнопка сохранения.
     */
    save: function (button) {
        button.up('form').submit({
            clientValidation: true,
            url: this.url,
            success: this.onSaveSuccess.bind(this),
            failure: this.onSaveFailure.bind(this)
        });
    },

    /**
     * Сброс формы.
     * @param {Ext.button.Button} button Кнопка сброса.
     */
    reset: function (button) {
        button.up('form').reset();
    },

    /**
     * @protected
     * Обработчик успешного сохранения.
     */
    onSaveSuccess: function () {
        this.showMessage('Успешно', 'Данные успешно сохранены.', 'INFO');
    },

    /**
     * @protected
     * Обработчик не успешного сохранения.
     * @param {Ext.form.Panel} form Форма сохранения.
     * @param {Ext.form.action.Action} action Объект действия формы.
     */
    onSaveFailure: function (form, action) {
        var types = Ext.form.action.Action;
        var defaultMessage = 'Проверьте подключение или попробуйте позже.';
        var serverMessage = action.result && action.result.message;
        var client = types.CLIENT_INVALID;
        var server = types.SERVER_INVALID && serverMessage;
        var connect = types.CONNECT_FAILURE || types.LOAD_FAILURE;

        switch (action.failureType) {
            case client:
                return;

            case server:
                this.showErrorMessage(serverMessage);
                return;

            case connect:
            default:
                this.showErrorMessage(defaultMessage);
        }
    },

    /**
     * @protected
     * Показывает сообщение об ошибке.
     * @param {String} message Текст сообщения.
     */
    showErrorMessage: function (message) {
        this.showMessage('Ошибка', message, 'ERROR');
    },

    /**
     * @protected
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
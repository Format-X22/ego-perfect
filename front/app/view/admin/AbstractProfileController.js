/**
 * Абстрактный контроллер профиля.
 */
Ext.define('A.view.partner.AbstractProfileController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'A.view.widget.AjaxSendMessagesMixin'
    ],

    /**
     * Меняет почту на указаннную.
     */
    changeEmail: function () {
        var formPanel = this.getView().up('form');
        var emailField = formPanel.down('[name=email]');
        var email = formPanel.getForm().getValues().email;
        var params = {
            email: email
        };

        if (emailField.isValid()) {
            this.send('/api/users/changeEmail', this.showSuccessSendMessage, params);
        }
    },

    /**
     * Запрашивает сброс пароля на почту.
     */
    resetPassword: function () {
        this.send('/api/users/resetPassword', this.showSuccessResetPasswordMessage);
    },

    /**
     * @protected
     * @method getId
     * @required
     * @template
     * @return {String} ID профиля.
     */
    getId: Ext.emptyFn,

    privates: {

        /**
         * @private
         */
        showSuccessResetPasswordMessage: function () {
            this.showSuccessMessage('Пароль успешно сброшен, новый пароль отправлен на указанную почту.');
        },

        /**
         * @private
         */
        mask: function () {
            this.getView().setLoading(true);
        },

        /**
         * @private
         */
        unmask: function () {
            this.getView().setLoading(false);
        },

        /**
         * @private
         * @param {String} url Ссылка.
         * @param {Function} successCallback Колбек в случае успеха.
         * @param {Object} [params] Объект параметров.
         */
        send: function (url, successCallback, params) {
            params = Ext.apply({
                id: this.getId()
            }, params);

            this.mask();

            Ext.Ajax.request({
                url: url,
                method: 'POST',
                callback: this.unmask.bind(this),
                success: successCallback.bind(this),
                failure: this.showFailureSendMessage.bind(this),
                params: params
            });
        }
    }
});
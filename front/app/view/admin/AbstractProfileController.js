/**
 * Абстрактный контроллер профиля.
 */
Ext.define('A.view.admin.AbstractProfileController', {
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
            this.send('/api/auth/changeEmail', function () {
                this.showSuccessSendMessage();
                this.toSearch();
            }, params);
        }
    },

    /**
     * Запрашивает сброс пароля на почту.
     */
    resetPassword: function () {
        this.send('/api/auth/changePass', function () {
            this.showSuccessResetPasswordMessage();
            this.toSearch();
        });
    },

    privates: {

        /**
         * @private
         */
        showSuccessResetPasswordMessage: function () {
            this.showSuccessMessage('Пароль успешно сброшен, новый пароль отправлен на вашу почту.');
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
            this.mask();

            Ext.Ajax.request({
                url: url,
                method: 'POST',
                callback: this.unmask.bind(this),
                success: successCallback.bind(this),
                failure: this.showFailureSendMessage.bind(this),
                params: params
            });
        },

        /**
         * @private
         */
        toSearch: function () {
            this.getView().up('form').down('#topToolbar').getController().toSearch();
        }
    }
});
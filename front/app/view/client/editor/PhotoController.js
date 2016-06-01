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
    },

    /**
     * Отправляет запрос на бесплатный логотип.
     * @param {Ext.button.Button} button Кнопка.
     */
    drawForMe: function (button) {
        button.disable();
        button.setText('Успешно, ваш запрос получен.');
        this.mask();
        this.sendAndHandleDrawRequest();
    },

    privates: {

        /**
         * @private
         */
        mask: function () {
            this.getView().mask();
        },

        /**
         * @private
         */
        unmask: function () {
            this.getView().unmask();
        },

        /**
         * @private
         */
        sendAndHandleDrawRequest: function () {
            Ext.Ajax.request({
                url: '/api/client/drawforme',
                method: 'POST',
                scope: this,
                callback: this.unmask,
                success: this.showDrawOkMessage,
                failure: this.showDrawErrorMessage
            });
        },

        /**
         * @private
         */
        showDrawOkMessage: function () {
            Ext.MessageBox.show({
                icon: Ext.Msg.INFO,
                title: 'Успешно',
                message:
                    'В течении 3х дней вам будет установлен логотип,<br>' +
                    'созданный на основе дизайна вашего сайта.<br>' +
                    'Обратите внимание что этот логотип<br>' +
                    'может не учитывать всей специфики вашего бизнеса,<br>' +
                    'рекомендуем в будущем заказать логотип с индивидуальным дизайном<br>' +
                    'в любой дизайн-компании, в том числе среди тех,<br>' +
                    'что есть на нашем сайте, просто воспользуйтесь поиском.',
                buttons: Ext.MessageBox.OK
            });
        },

        /**
         * @private
         */
        showDrawErrorMessage: function () {
            Ext.MessageBox.show({
                icon: Ext.Msg.ERROR,
                title: 'Ошибка',
                message: 'Заказы временно не принимаются.',
                buttons: Ext.MessageBox.OK
            });
        }
    }
});
/**
 * Контроллер верхнего тулбара для админок.
 */
Ext.define('A.view.admin.TopToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.adminTopToolbar',

    /**
     * Перейти на страницу поиска, главную страницу сайта.
     */
    toSearch: function () {
        A.getCmp('appMain').setActiveItem(0);
        A.getCmp('appMainPublic #mainTabPanel').setActiveItem(0);
    },

    /**
     * Перейти на страницу деталей этой компании.
     */
    toDetails: function () {
        console.log('to details'); // @TODO
    },

    /**
     * Зарелизить изменения компании.
     */
    release: function () {
        if (this.isPayed()) {
            this.releasePayed();
        } else {
            this.releaseUnpayed();
        }
    },

    /**
     * Выйти из панели управления.
     */
    exit: function () {
        var form = this.getView().up('form');

        form.mask();

        Ext.Ajax.request({
            method: 'POST',
            url: '/api/auth/logout',
            callback: function () {
                form.unmask();
                this.toSearch();
            }.bind(this)
        });
    },

    /**
     * Завершает подготовку вью к показу.
     */
    onShow: function () {
        if (!this.isPayed()) {
            this.getView().down('#release').show();
        } else {
            this.getView().down('#toDetails').show();
        }
    },

    privates: {

        /**
         * @private
         * @return {Boolean} Оплатил ли клиент.
         */
        isPayed: function () {
            return false;  // @TODO
        },

        /**
         * @private
         */
        releasePayed: function () {
            this.sendReleaseRequest(function () {
                this.getView().unmask();
                this.toggleReleaseButton();
                this.showSuccessPayedMessage(
                    this.ifOkButton(
                        this.toDetails.bind(this)
                    )
                );
            });
        },

        /**
         * @private
         */
        releaseUnpayed: function () {
            this.showNotPayedMessage(
                this.ifOkButton(
                    this.goToPayPage.bind(this)
                )
            );
        },
        
        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        sendReleaseRequest: function (next) {
            Ext.Ajax.request({
                url: '/api/client/release',
                method: 'POST',
                success: next,
                failure: function () {
                    this.getView().unmask();
                    this.showErrorReleaseMessage();
                },
                scope: this
            });
        },

        /**
         * @private
         * @param {Function} callback Обработчик действия пользователя.
         */
        showNotPayedMessage: function (callback) {
            Ext.MessageBox.show({
                title: 'Не оплачено',
                message: 'Похоже вы ещё не оплатили размещение.<br>Вы можете сделать это сейчас.',
                icon: Ext.MessageBox.INFO,
                buttons: Ext.MessageBox.OKCANCEL,
                fn: callback
            });
        },

        /**
         * @private
         * @param {Function} callback Обработчик действия пользователя.
         */
        showSuccessPayedMessage: function (callback) {
            Ext.MessageBox.show({
                title: 'Успешно',
                message: 'Ваша компания успешно размещена.<br>Хотите посмотреть как она выглядит в живую?',
                icon: Ext.MessageBox.INFO,
                buttons: Ext.MessageBox.OKCANCEL,
                fn: callback
            });
        },

        /**
         * @private
         */
        showErrorReleaseMessage: function () {
            Ext.MessageBox.show({
                title: 'Ошибка',
                message: 'При размещении произошла ошибка, попробуйте позже.',
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.MessageBox.OK
            });
        },

        /**
         * @private
         * @param {Function} callback Следующий шаг в случае если кнопка ОК.
         * @return {Function} Обертка для вызова диалоговым окном.
         */
        ifOkButton: function (callback) {
            return function (button) {
                if (button === 'ok') {
                    callback();
                }
            }
        },

        /**
         * @private
         */
        toggleReleaseButton: function () {
            this.getView().down('#release').hide();
            this.getView().down('#toDetails').show();
        },

        /**
         * @private
         */
        goToPayPage: function () {
            console.log('go to pay page'); // @TODO
        }
    }
});
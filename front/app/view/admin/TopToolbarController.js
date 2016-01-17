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
        if (Ext.isClassic) {
            return A.getCmp('#mainTabPanel').setActiveTab(0);
        } else {
            return A.getCmp('mainTabPanel').setActiveItem(0);
        }
    },

    /**
     * Перейти на страницу деталей этой компании.
     */
    toDetails: function () {
        console.log('to details'); // @TODO
    },

    /**
     * Зарелизить изменения компании.
     * Используется только в самом начале чтобы указать
     * на тот факт что услуга пока ещё не оплачена.
     */
    release: function () {
        if (this.isPayed()) {
            this.toggleReleaseButton();
            this.showSuccessPayedMessage(
                this.ifOkButton(
                    this.toDetails.bind(this)
                )
            );
        } else {
            this.showNotPayedMessage(
                this.ifOkButton(
                    this.goToPayPage.bind(this)
                )
            );
        }
    },

    /**
     * Выйти из панели управления.
     */
    exit: function () {
        console.log('exit'); // @TODO
        this.toSearch();
    },

    /**
     * Завершает подготовку вью к показу.
     */
    onShow: function () {
        if (this.isNewClient()) {
            this.getView().down('#release').show();
        } else {
            this.getView().down('#toDetails').show();
        }
    },

    privates: {

        /**
         * @private
         * @return {Boolean} Новый ли клиент.
         */
        isNewClient: function () {
            return true;
        },

        /**
         * @private
         * @return {Boolean} Оплатил ли клиент.
         */
        isPayed: function () {
            return false;
        },

        /**
         * @private
         * @param {Function} callback Обработчик действия пользователя.
         */
        showNotPayedMessage: function (callback) {
            Ext.MessageBox.show({
                title: 'Оопс...',
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
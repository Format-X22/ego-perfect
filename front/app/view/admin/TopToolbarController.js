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
        var clientMain = this.getView().up('appMainClient');
        var id = clientMain.down('[name=_id]').getValue();
        var searchMainTabPanel = A.getCmp('#mainTabPanel');
        var searchContainer = searchMainTabPanel.down('searchContainer');
        var searchResult = searchMainTabPanel.down('searchResult');
        var companyContainer = searchMainTabPanel.down('companyContainer');

        this.toSearch();
        
        searchContainer.getController().toggleInitView();
        searchResult.getController().openCompany(id);
        
        companyContainer.down('#backToSearch').hide();
        companyContainer.down('#backToAdmin').show();
        companyContainer.down('#backToSearchFromAdmin').show();
        
        if (!this.isPayed()) {
            Ext.MessageBox.alert('Внимание', 'Компания не будет отображаться в общем поиске до оплаты!');
        }
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
        var view = this.getView();

        this.getPayDateField().on('change', function () {
            if (this.isPayed()) {
                view.down('#release').hide();
            } else {
                view.down('#release').show();
            }
        }, this);
    },

    privates: {

        /**
         * @private
         * @return {Boolean} Оплатил ли клиент.
         */
        isPayed: function () {
            var field = this.getPayDateField();
            var date = field.getValue();
            var dateObject;
            
            if (date) {
                dateObject = Ext.Date.parse(date.slice(0, 10), 'Y-m-d');

                return dateObject > new Date();
            } else {
                return false;
            }
        },

        /**
         * @private
         * @return {Ext.form.field.Display} Поле с датой оплаты.
         */
        getPayDateField: function () {
            return this.getView().up('appMainClient').down('form [name=payDate]');
        },

        /**
         * @private
         */
        releasePayed: function () {
            this.sendReleaseRequest(function () {
                this.getView().unmask();
                this.toggleReleaseButton();
                this.showSuccessPayedMessage(
                    this.ifYesButton(
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
                this.ifYesButton(
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
                buttons: Ext.MessageBox.YESNO,
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
                buttons: Ext.MessageBox.YESNO,
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
         * @param {Function} callback Следующий шаг в случае если кнопка ДА.
         * @return {Function} Обертка для вызова диалоговым окном.
         */
        ifYesButton: function (callback) {
            return function (button) {
                if (button === 'yes') {
                    callback();
                }
            }
        },

        /**
         * @private
         */
        toggleReleaseButton: function () {
            this.getView().down('#release').hide();
        },

        /**
         * @private
         */
        goToPayPage: function () {
            this.getView().up('appMainClient').down('tabpanel').setActiveTab(3);
        }
    }
});
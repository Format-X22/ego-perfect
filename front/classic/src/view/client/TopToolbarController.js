/**
 * Контроллер верхнего тулбара для админки клиента.
 */
Ext.define('A.view.client.TopToolbarController', {
    extend: 'A.view.admin.TopToolbarController',
    alias: 'controller.clientTopToolbar',

    /**
     * Перейти на страницу поиска, главную страницу сайта.
     * @param {Boolean} force Совершить действие без проверок.
     */
    toSearch: function self (force) {
        if (force) {
            this.callParent(arguments);
        } else {
            this.checkEditorSaveAndCallAgainWithForce(self);
        }
    },

    /**
     * Перейти на страницу деталей этой компании.
     * @param {Boolean} force Совершить действие без проверок.
     */
    toDetails: function self (force) {
        if (force) {
            this.callParent(arguments);
        } else {
            this.checkEditorSaveAndCallAgainWithForce(self);
        }
    },

    /**
     * Выйти из панели управления.
     * @param {Boolean} force Совершить действие без проверок.
     */
    exit: function self (force) {
        if (force) {
            this.callParent(arguments);
        } else {
            this.checkEditorSaveAndCallAgainWithForce(self);
        }
    },

    privates: {

        /**
         * @private
         * @param {Function} method Ссылака на метод.
         */
        checkEditorSaveAndCallAgainWithForce: function (method) {
            method = this.wrapForceFlag(method);

            this.checkEditorSave(method);
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        checkEditorSave: function (next) {
            var innerForms = this.getAllEditorForms();
            var allSaved = true;

            Ext.each(innerForms, function (inner) {
                if (inner.isDirty()) {
                    allSaved = false;
                    return false;
                }
            });

            if (allSaved) {
                next();
            } else {
                this.showNotSavedMessage(next);
            }
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        showNotSavedMessage: function (next) {
            Ext.MessageBox.show({
                title: 'Сохранение',
                message: 'Данные не сохранены и будут удалены!<br>Сохранить сейчас?',
                icon: Ext.MessageBox.INFO,
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                fn: function (button) {
                    if (button === 'no') {
                        next();
                    } else {
                        this.ifSaveWanted();
                    }
                }
            });
        },

        /**
         * @private
         */
        ifSaveWanted: function () {
            this.checkEditorValid(
                this.saveEditorForms.bind(this)
            );
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        checkEditorValid: function (next) {
            var forms = this.getAllEditorForms();
            var allValid = true;
            
            
            Ext.each(forms, function (inner) {
                if (inner.hasInvalidField()) {
                    this.showEditorForm(inner);
                    this.showEditorInvalidMessage();
                    allValid = false;
                    return false;
                }
            }, this);

            if (allValid) {
                next();
            }
        },

        /**
         * @private
         */
        showEditorInvalidMessage: function () {
            Ext.MessageBox.show({
                title: 'Невозможно сохранить',
                message: 'Данные не верны, проверьте правильность введенных данных.',
                icon: Ext.MessageBox.ERROR
            });
        },

        /**
         * @private
         */
        saveEditorForms: function () {
            var forms = this.getAllEditorForms();

            Ext.each(forms, this.saveForm.bind(this));
        },

        /**
         * @private
         * @param {Ext.form.Panel} form Форма.
         */
        showEditorForm: function (form) {
            var mainForm = this.getMainForm();
            var target = mainForm.down(form);
            var tabPanel = mainForm.down('#editorTabPanel');

            tabPanel.setActiveTab(target);
        },

        /**
         * @private
         * @return {Ext.form.Form} Главная форма.
         */
        getMainForm: function () {
            return this.getView().up('form');
        },

        /**
         * @private
         * @return {Ext.form.Panel[]} Формы.
         */
        getAllEditorForms: function () {
            var form = this.getMainForm();
            var all = A.getAllCmp('form', form);

            return Ext.Array.filter(all, this.isEditorForm, this);
        },

        /**
         * @private
         * @param {Ext.form.Panel} form Форма.
         */
        saveForm: function (form) {
            form.getController().save(form.down('widgetSaveToolbar #save'));
        },

        /**
         * @private
         * @param {Ext.form.Panel} form Форма.
         * @return {Boolean} Является ли форма эдитором.
         */
        isEditorForm: function (form) {
            return /editor/i.test(form.xtype);
        },

        /**
         * @private
         * @param {Function} method Метод для фызова с форсом.
         * @return {Function} Колбек-обертка.
         */
        wrapForceFlag: function (method) {
            var me = this;

            return function () {
                method.call(me, true);
            }
        }
    }
});
/**
 * Контроллер окна с клиентской офертой.
 */
Ext.define('A.view.main.auth.ClientOfferRegisterWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainAuthClientOfferRegisterWindow',

    /**
     * Переключает кнопку завершения.
     * @param {Ext.form.field.Checkbox} field Поле согласия
     * @param {Boolean} value Значение поля.
     */
    toggleDoneButton: function (field, value) {
        var next = this.getView().down('#next');

        if (value) {
            next.enable();
        } else {
            next.disable();
        }
    },

    /**
     * Оповещает о завершении.
     */
    notifyDone: function () {
        this.getView().fireEvent('done');
    }
});
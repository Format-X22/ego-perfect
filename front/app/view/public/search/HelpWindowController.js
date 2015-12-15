/**
 * Контроллер окна подсказки о том что нужно
 * нажимать на квадраты.
 */
Ext.define('A.view.public.search.HelpWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.searchHelpWindow',

    control: {
        'searchHelpWindow': {
            beforeshow: 'checkNoShowed',
            close: 'closeWindowHandler'
        }
    },

    /**
     * Проверка на то что окно ещё не было показано.
     * При этом состояние показанности хранится в локалсторадже
     * и сохраняется между сеансами.
     * @return {Boolean} Результат.
     */
    checkNoShowed: function () {
        var storage = Ext.util.LocalStorage.get('helpWindowState');
        var notShowed = !storage.getItem('showed');

        storage.release();

        return notShowed;
    },

    /**
     * Обработчик закрытия окна.
     * Сохраняет факт показанности окна в локалсторадже.
     */
    closeWindowHandler: function () {
        var view = this.getView();
        var storage = Ext.util.LocalStorage.get('helpWindowState');
        var hidden = view.isHidden();

        if (Ext.isClassic && hidden) {
            return;
        }

        storage.setItem('showed', true);
        storage.release();

        if (Ext.isClassic) {
            this.getView().close();
        }
    },

    /**
     * Для модерна, показывает окно подсказки.
     */
    modernShow: function () {
        if (this.checkNoShowed()) {
            this.getView().show({
                fn: this.closeWindowHandler.bind(this)
            });
        }
    }
});
/**
 * Контроллер абстрактной информационной страницы.
 */
Ext.define('A.view.main.infoPage.AbstractPageController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainInfoPageAbstractPageController',

    /**
     * Фикс фриза скрола.
     */
    fixFreeze: function () {
        var view = this.getView();
        var scroll = view.getScrollable();

        Ext.defer(function () {
            scroll.refresh(true);
        }, 550, this);
    }
});
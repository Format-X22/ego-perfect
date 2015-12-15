/**
 * Модель для тулбара с меню для телефонов.
 */
Ext.define('A.view.public.MobileMenuToolbarModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mobileMenuToolbar',

    data: {

        /**
         * @property {String} currentPageName (data) Имя текущей страницы.
         */
        currentPageName: 'Поиск'
    }
});
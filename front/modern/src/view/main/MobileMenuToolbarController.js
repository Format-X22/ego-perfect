/**
 * Контроллер тулбара с меню для телефонов.
 */
Ext.define('A.view.main.MobileMenuToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mobileMenuToolbar',

    /**
     * Показывает выдвигающееся меню для телефонов.
     */
    showMobileMenu: function () {
        this.destroyOldMenu();
        
        var mobileMenu = Ext.create('A.view.main.MobileMenu');
        var menuConfig = {
            side: 'right'
        };
        
        Ext.Viewport.setMenu(mobileMenu, menuConfig);
        Ext.Viewport.toggleMenu('right');
    },

    /**
     * Возвращает к результатам поиска,
     * делегирую действие контроллеру поиска.
     * @param {Ext.Button} button Кнопка.
     */
    backToSearch: function (button) {
        A.getCmp('searchResult').getController().backToSearch();
        button.hide();
    },
    
    privates: {

        /**
         * @private
         * Необходимо уничтожать старое меню для адекватного рендеринга на iOS 9.
         */
        destroyOldMenu: function () {
            var menu = A.getCmp('mobileMenu');
            
            if (menu) {
                Ext.Viewport.removeMenu('right');
                menu.destroy();
            }
        }
    }
});
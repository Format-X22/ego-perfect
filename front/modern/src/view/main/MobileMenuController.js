/**
 * Контроллер выдвигающегося меню для телефонов.
 */
Ext.define('A.view.main.MobileMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mobileMenu',

    /**
     * Переключение на указанную страницу, инициированное мобильным меню.
     * @param {Number} pageNum Номер страницы.
     */
    goToPage: function (pageNum) {
        Ext.ComponentQuery.query('app-main mainTabPanel')[0].setActiveItem(pageNum);
        Ext.Viewport.toggleMenu('right');

        this.toggleBackToSearchMobileButton(pageNum);
    },

    /**
     *
     * @param pageNum
     */
    toggleBackToSearchMobileButton: function (pageNum) {
        var backButton = Ext.ComponentQuery.query('#backToSearchMobile')[0];
        var companyContainer = Ext.ComponentQuery.query('companyContainer')[0];
        var searchPage = (pageNum === 0);
        var companyDetailsOpen = !companyContainer.isHidden();

        if (searchPage && companyDetailsOpen) {
            backButton.show();
        } else {
            backButton.hide();
        }
    }
});
/**
 * Контроллер выдвигающегося меню для телефонов.
 */
Ext.define('A.view.public.MobileMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mobileMenu',

    /**
     * Переключение на указанную страницу, инициированное мобильным меню.
     * @param {Number} pageNum Номер страницы.
     */
    goToPage: function (pageNum) {
        A.getCmp('appMainPublic mainTabPanel').setActiveItem(pageNum);
        Ext.Viewport.toggleMenu('right');

        this.toggleBackToSearchMobileButton(pageNum);
    },

    privates: {

        /**
         * @private
         * @param {Number} pageNum Номер страницы.
         */
        toggleBackToSearchMobileButton: function (pageNum) {
            var backButton = A.getCmp('#backToSearchMobile');
            var companyContainer = A.getCmp('companyContainer');
            var searchPage = (pageNum === 0);
            var companyDetailsOpen = !companyContainer.isHidden();

            if (searchPage && companyDetailsOpen) {
                backButton.show();
            } else {
                backButton.hide();
            }
        }
    }
});
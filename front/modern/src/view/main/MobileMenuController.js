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
        A.getCmp('appMainPublic mainTabPanel').setActiveItem(pageNum);
        Ext.Viewport.toggleMenu('right');

        if (pageNum === 0) {
            this.goToStartMobileSearch();
        }

        this.toggleBackToSearchMobileButton(pageNum);
    },

    /**
     * Переключает видимость кнопки "Назад" для мобильных.
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
    },

    privates: {

        /**
         * @private
         */
        goToStartMobileSearch: function () {
            var mainTabPanel = A.getCmp('appMainPublic mainTabPanel');
            var container = mainTabPanel.down('searchContainer');
            var result = container.down('#searchResult');
            var startSearch = container.down('startMobileSearch');

            result.hide('flip');
            startSearch.show('flip');
            result.getController().backToSearch();
        }
    }
});
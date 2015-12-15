/**
 * Контроллер результатов поиска.
 */
Ext.define('A.view.public.search.SearchResultController', {
    extend: 'A.view.public.company.AbstractSearchResultController',
    alias: 'controller.searchResult',

    /**
     * @inheritdoc
     */
    showCompany: function () {
        this.callParent(arguments);
        this.showMobileBackButton();
    },

    /**
     * @inheritdoc
     */
    backToSearch: function () {
        this.callParent(arguments);
        this.hideMobileBackButton();
    },

    privates: {

        /**
         * @private
         */
        showMobileBackButton: function () {
            this.getMobileBackButton().show();
        },

        /**
         * @private
         */
        hideMobileBackButton: function () {
            this.getMobileBackButton().hide();
        },

        /**
         * @private
         * @return {Ext.Button} Кнопка.
         */
        getMobileBackButton: function () {
            return A.getCmp('#backToSearchMobile');
        }
    }
});
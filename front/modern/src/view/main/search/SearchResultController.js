/**
 * Контроллер результатов поиска.
 */
Ext.define('A.view.main.search.SearchResultController', {
    extend: 'A.view.main.company.AbstractSearchResultController',
    alias: 'controller.searchResult',

    control: {
        '#searchResult': {
            show: 'fixScrollFreeze'
        }
    },

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
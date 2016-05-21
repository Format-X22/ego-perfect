/**
 * Контроллер результатов поиска.
 */
Ext.define('A.view.main.search.SearchResultController', {
    extend: 'A.view.main.company.AbstractSearchResultController',
    alias: 'controller.searchResult',

    control: {
        '#searchResult': {
            show: 'fixScrollFreeze',
            refresh: 'fixScrollFreeze'
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
        if (this.isNoSearchResult()) {
            this.toggleToStartSearch();
        }
        
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
        },

        /**
         * @private
         */
        toggleToStartSearch: function () {
            var container = A.getCmp('searchContainer');
            var width = Ext.Viewport.getWindowWidth();
            var height = Ext.Viewport.getWindowHeight();
            var mobileSearch = container.down('startMobileSearch');
            var tabletSearch = container.down('startTabletSearch');
            
            container.down('#searchResult').hide();

            if (width < 600 || height < 400) {
                tabletSearch.hide();
                mobileSearch.show('flip');
            } else {
                mobileSearch.hide();
                tabletSearch.show('flip');
            }
        }
    }
});
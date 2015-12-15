/**
 * Контроллер всего что относится к поиску.
 */
Ext.define('A.view.public.search.AllSearchController', {
    extend: 'A.view.public.company.AbstractAllSearchController',
    alias: 'controller.allSearch',

    /**
     * @inheritdoc
     */
    toggleInitView: function () {
        this.getMobileSearch().hide();
        this.getTabletSearch().hide();
        this.getSearchResult().show();
    },

    /**
     * Переключает стартовый планшетный вид к простому виду только с полем ввода,
     * для удобства ввода текста.
     */
    switchTabletInitToSimple: function () {
        this.getView().down('startTabletSearch #img').hide();
        this.getView().down('startTabletSearch #description').hide();
    },

    /**
     * Переключает стартовый планшетный вид к полному, возможно в случае если пользователь
     * почему-то решил больше не вводить текст и сбросить фокус.
     */
    switchTabletInitToFull: function () {
        this.getView().down('startTabletSearch #img').show();
        this.getView().down('startTabletSearch #description').show();
    },

    privates: {

        /**
         * @private
         * @return {Ext.Component} Компонент стартового мобильного поиска.
         */
        getMobileSearch: function () {
            return A.getCmp('startMobileSearch');
        },

        /**
         * @private
         * @return {Ext.Component} Компонент стартового планшетного поиска.
         */
        getTabletSearch: function () {
            return A.getCmp('startTabletSearch');
        },

        /**
         * @private
         * @return {Ext.Component} Компонент результатов поиска.
         */
        getSearchResult: function () {
            return A.getCmp('searchResult');
        }
    }
});
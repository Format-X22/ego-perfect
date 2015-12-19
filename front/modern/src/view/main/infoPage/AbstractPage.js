/**
 * Вью абстрактной информационной страницы.
 */
Ext.define('A.view.main.infoPage.AbstractPage', {
    extend: 'Ext.Container',

    requires: [
        'Ext.plugin.Responsive',
        'A.view.main.infoPage.InfoComicIcon'
    ],

    layout: {
        type: 'hbox',
        pack: 'center'
    },
    scrollable: 'vertical',

    config: {

        /**
         * @cfg {Ext.data.Store} store Стор с данными для итемов страницы.
         */
        store: null
    },

    items: [
        {
            xtype: 'dataview',
            useComponents: true,
            inline: true,
            defaultType: 'infoComicIcon',
            scrollable: false,
            plugins: 'responsive',
            responsiveConfig: {
                'width < 270': {
                    width: '100%'
                },
                'width < 540 && width >= 270': {
                    width: 270
                },
                'width < 810 && width >= 540': {
                    width: 540
                },
                'width >= 810': {
                    width: 810
                }
            }
        }
    ],

    /**
     * @protected
     * Проставляем стор для датавью, получая его из конфига класса.
     */
    initialize: function () {
        var store = Ext.data.StoreManager.lookup(this.getStore());
        var dataView = this.down('dataview');

        dataView.setStore(store);
        this.callParent(arguments);
    }
});
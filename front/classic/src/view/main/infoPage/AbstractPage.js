Ext.define('A.view.main.infoPage.AbstractPage', {
    extend: 'Ext.Container',

    requires: [
        'Ext.plugin.Responsive',
        //'A.view.main.infoPage.InfoComicIcon'
    ],

    layout: {
        type: 'hbox',
        pack: 'center'
    },

    config: {
        store: null
    },

    items: [
        /*{
            xtype: 'dataview',
            useComponents: true,
            inline: true,
            defaultType: 'infoComicIcon',
            scrollable: 'vertical',
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
        }*/
    ],

    /*initialize: function () {
        var store = Ext.data.StoreManager.lookup(this.getStore());
        var dataView = this.down('dataview');

        dataView.setStore(store);
        this.callParent(arguments);
    }*/
});
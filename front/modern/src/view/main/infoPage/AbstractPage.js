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

    config: {
        store: null
    },

    items: [
        {
            xtype: 'dataview',
            useComponents: true,
            inline: true,
            defaultType: 'infoComicIcon',
            scrollable: 'vertical',
            plugins: 'responsive',
            responsiveConfig: {
                'width < 210': {
                    width: '100%'
                },
                'width < 410 && width >= 210': {
                    width: 210
                },
                'width < 610 && width >= 410': {
                    width: 410
                },
                'width < 810 && width >= 610': {
                    width: 610
                },
                'width < 1210 && width >= 1010': {
                    width: 810
                },
                'width >= 1210': {
                    width: 1010
                }
            }
        }
    ],

    initialize: function () {
        var store = Ext.data.StoreManager.lookup(this.getStore());
        var dataView = this.down('dataview');

        dataView.setStore(store);
        this.callParent(arguments);
    }
});
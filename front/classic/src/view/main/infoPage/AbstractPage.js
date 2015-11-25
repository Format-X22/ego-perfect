/**
 *
 */
Ext.define('A.view.main.infoPage.AbstractPage', {
    extend: 'Ext.Container',

    requires: [
        'Ext.plugin.Responsive'
    ],

    scrollable: 'vertical',
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
            tpl:
                '<tpl for=".">' +
                    '<div class="item info-comic-icon">' +
                        '<img src="http://img2.wikia.nocookie.net/__cb20130207074041/adventuretime/ru/images/5/55/180x180_profile_adventuretime_jake_01.jpg">' +
                        '<div class="header">{header}</div>' +
                        '<div class="description">{description}</div>' +
                    '</div>' +
                '</tpl>',
            itemSelector: '.item',
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

    initComponent: function () {
        this.callParent(arguments);

        var store = Ext.data.StoreManager.lookup(this.getStore());
        var dataView = this.down('dataview');

        dataView.setStore(store);
    }
});
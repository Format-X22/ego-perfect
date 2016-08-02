/**
 * Абстрактная страница информации.
 */
Ext.define('A.view.main.infoPage.AbstractPage', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.plugin.Responsive'
    ],

    scrollable: 'vertical',
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    cls: 'grey-back',

    config: {

        /**
         * @cfg {String} store Имя стора с информацией для страницы.
         */
        store: null
    },

    dockedItems: [
        {
            xtype: 'toolbar',
            height: 0,
            padding: 0,
            cls: 'shadow-toolbar',
            dock: 'top'
        }
    ],

    items: [
        {
            flex: 1
        },
        {
            xtype: 'dataview',
            tpl:
                '<tpl for=".">' +
                    '<div class="item info-comic-icon">' +
                        '<img src="{url}">' +
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
        },
        {
            flex: 2
        }
    ],

    /**
     * @inheritdoc
     */
    initComponent: function () {
        this.callParent(arguments);

        var store = Ext.data.StoreManager.lookup(this.getStore());
        var dataView = this.down('dataview');

        dataView.setStore(store);
    }
});
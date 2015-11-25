/**
 * Главный виджет.
 */
Ext.define('A.view.main.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Responsive',
        'A.view.main.MobileMenuToolbar',
        'A.view.main.MobileMenu',
        'A.view.main.MainTabPanel'
    ],

    layout: 'vbox',

    items: [
        {
            xtype: 'mobileMenuToolbar',
            plugins: 'responsive',
            responsiveConfig: {
                'width < 600 || height < 400': {
                    hidden: false
                },
                'width >= 600 && height >= 400': {
                    hidden: true
                }
            }
        },
        {
            xtype: 'mainTabPanel',
            plugins: 'responsive',
            responsiveConfig: {
                'width < 600 || height < 400': {
                    tabBar: {
                        hidden: true
                    }
                },
                'width >= 600 && height >= 400': {
                    tabBar: {
                        hidden: false
                    }
                }
            }
        }
    ],

    /**
     * @inheritdoc
     * @localdoc
     * Добавляем выдвигающееся меню для телефонов.
     */
    initialize: function () {
        var mobileMenu = Ext.create('A.view.main.MobileMenu');
        var menuConfig = {
            side: 'right'
        };

        Ext.Viewport.setMenu(mobileMenu, menuConfig);

    }
});

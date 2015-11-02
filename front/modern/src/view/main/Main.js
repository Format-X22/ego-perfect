Ext.define('A.view.main.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',

    requires: [
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
                'width < 600': {
                    hidden: false
                },
                'width >= 600': {
                    hidden: true
                }
            }
        },
        {
            xtype: 'mainTabPanel',
            plugins: 'responsive',
            responsiveConfig: {
                'width < 600': {
                    tabBar: {
                        hidden: true
                    }
                },
                'width >= 600': {
                    tabBar: {
                        hidden: false
                    }
                }
            }
        }
    ],

    initialize: function () {
        var mobileMenu = Ext.create('A.view.main.MobileMenu');
        var menuConfig = {
            side: 'right'
        };

        Ext.Viewport.setMenu(mobileMenu, menuConfig);

    }
});

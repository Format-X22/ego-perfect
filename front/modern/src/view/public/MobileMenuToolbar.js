/**
 * Тулбар с титлом текущей страницы и меню для телефонов.
 */
Ext.define('A.view.public.MobileMenuToolbar', {
    extend: 'Ext.Toolbar',
    xtype: 'mobileMenuToolbar',
    controller: 'mobileMenuToolbar',
    viewModel: 'mobileMenuToolbar',
    requires: [
        'A.view.public.MobileMenuToolbarController',
        'A.view.public.MobileMenuToolbarModel'
    ],

    bind: {
        title: '{currentPageName}'
    },

    items: [
        {
            itemId: 'backToSearchMobile',
            xtype: 'button',
            iconCls: 'x-fa fa-chevron-left',
            hidden: true,
            handler: 'backToSearch'
        },
        '->',
        {
            xtype: 'button',
            iconCls: 'x-fa fa-bars',
            iconAlign: 'right',
            handler: 'showMobileMenu'
        }
    ]
});
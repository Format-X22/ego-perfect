Ext.define('A.view.main.MobileMenuToolbar', {
    extend: 'Ext.Toolbar',
    xtype: 'mobileMenuToolbar',
    controller: 'mobileMenuToolbar',
    viewModel: 'mobileMenuToolbar',
    requires: [
        'A.view.main.MobileMenuToolbarController',
        'A.view.main.MobileMenuToolbarModel'
    ],

    bind: {
        title: '{currentPageName}'
    },

    items: [
        '->',
        {
            xtype: 'button',
            iconCls: 'x-fa fa-th-list',
            iconAlign: 'right',
            handler: 'showMobileMenu'
        }
    ]
});
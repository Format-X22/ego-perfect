/**
 * Мобильное выдвигающееся меню.
 */
Ext.define('A.view.main.MobileMenu', {
    extend: 'Ext.Menu',
    xtype: 'mobileMenu',
    controller: 'mobileMenu',
    requires: [
        'A.view.main.MobileMenuController'
    ],

    items: [
        {
            text: 'Поиск',
            iconCls: 'x-fa fa-search',
            handler: function () {
                this.up().getController().goToPage(0);
            }
        },
        {
            text: 'Клиентам',
            iconCls: 'x-fa fa-user',
            handler: function () {
                this.up().getController().goToPage(1);
            }
        },
        {
            text: 'Партнерам',
            iconCls: 'x-fa fa-money',
            handler: function () {
                this.up().getController().goToPage(2);
            }
        }
    ]
});
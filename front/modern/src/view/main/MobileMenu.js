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
            minWidth: 150,
            handler: function () {
                this.up().getController().goToPage(0);
            }
        },
        {
            text: 'Клиентам',
            minWidth: 150,
            handler: function () {
                this.up().getController().goToPage(1);
            }
        },
        {
            text: 'Контакты',
            minWidth: 150,
            handler: function () {
                this.up().getController().goToPage(2);
            }
        },
        {
            text: 'Оферта',
            minWidth: 150,
            handler: function () {
                this.up().getController().goToPage(4);
            }
        }
    ]
});
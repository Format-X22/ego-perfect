Ext.define('A.view.main.MobileMenu', {
    extend: 'Ext.Menu',
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
        },
        {
            text: 'О нас',
            iconCls: 'x-fa fa-thumbs-up',
            handler: function () {
                this.up().getController().goToPage(3);
            }
        },
        {
            text: 'Вход',
            iconCls: 'x-fa fa-home',
            handler: function () {
                this.up().getController().goToPage(4);
            }
        },
        {
            text: 'Добавить себя',
            iconCls: 'x-fa fa-user-plus',
            handler: function () {
                this.up().getController().goToPage(5);
            }
        }
    ]
});
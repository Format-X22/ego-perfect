Ext.define('A.view.main.MobileMenu', {
    extend: 'Ext.Menu',

    items: [
        {
            text: 'Поиск',
            iconCls: 'x-fa fa-search',
            handler: function () {
                this.up().goToPage(0);
            }
        },
        {
            text: 'Клиентам',
            iconCls: 'x-fa fa-user',
            handler: function () {
                this.up().goToPage(1);
            }
        },
        {
            text: 'Партнерам',
            iconCls: 'x-fa fa-user',
            handler: function () {
                this.up().goToPage(2);
            }
        },
        {
            text: 'О нас',
            iconCls: 'x-fa fa-user',
            handler: function () {
                this.up().goToPage(3);
            }
        },
        {
            text: 'Вход',
            iconCls: 'x-fa fa-home',
            handler: function () {
                this.up().goToPage(4);
            }
        },
        {
            text: 'Хочу к вам',
            iconCls: 'x-fa fa-user-plus',
            handler: function () {
                this.up().goToPage(5);
            }
        }
    ],

    goToPage: function (pageNum) {
        Ext.ComponentQuery.query('app-main tabpanel')[0].setActiveItem(pageNum);
        Ext.Viewport.toggleMenu('right');
    }
});
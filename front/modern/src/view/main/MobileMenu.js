Ext.define('A.view.main.MobileMenu', {
    extend: 'Ext.Menu',

    items: [
        {
            text: 'Поиск',
            iconCls: 'x-fa fa-search'
        },
        {
            text: 'Клиентам',
            iconCls: 'x-fa fa-user'
        },
        {
            text: 'Партнерам',
            iconCls: 'x-fa fa-user'
        },
        {
            text: 'О нас',
            iconCls: 'x-fa fa-user'
        },
        {
            text: 'Вход',
            iconCls: 'x-fa fa-home'
        },
        {
            text: 'Хочу к вам',
            iconCls: 'x-fa fa-user-plus'
        }
    ]
});
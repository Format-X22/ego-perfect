/**
 * Вью страницы регистрации.
 */
Ext.define('A.view.main.auth.Register', {
    extend: 'Ext.container.Container',
    xtype: 'register',

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'justify'
    },
    height: '100%',

    items: [
        {
            flex: 1
        },
        {
            xtype: 'component',
            html: 'Вы можете добавить свою компанию в наш каталог.'
        },
        {
            xtype: 'component',
            html: 'Это просто. Логин и пароль будут у вас на почте.'
        },
        {
            xtype: 'component',
            html: 'Это всё.'
        },
        {
            xtype: 'emailfield',
            placeHolder: 'Почта',
            width: '100%',
            maxWidth: 500,
            margin: '0 0 7 0'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '7 0 0 0',
            width: '100%',
            maxWidth: 500,
            items: [
                {
                    flex: 1
                },
                {
                    xtype: 'button',
                    ui: 'mobile-search',
                    html: 'Получить письмо',
                    iconCls: 'x-fa fa-envelope',
                    height: 35,
                    width: 200
                }
            ]
        },
        {
            flex: 1
        }
    ]
});

/**
 * Страница входа.
 */
Ext.define('A.view.main.auth.LoginPage', {
    extend: 'Ext.form.Panel',
    xtype: 'loginPage',
    controller: 'mainAuthLoginPage',

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    defaults: {
        width: 500
    },

    items: [
        {
            flex: 1
        },
        {
            xtype: 'image',
            width: 240,
            height: 150,
            src: '/resources/img/logo.svg',
            margin: '0 0 10 0'
        },
        {
            xtype      : 'fieldcontainer',
            fieldLabel : 'Я',
            defaultType: 'radiofield',
            defaults: {
                flex: 1
            },
            layout: 'hbox',
            items: [
                {
                    boxLabel  : 'Клиент',
                    name      : 'accType',
                    inputValue: 'client',
                    checked: true
                },
                {
                    boxLabel  : 'Партнер',
                    name      : 'accType',
                    inputValue: 'partner'
                }
            ]
        },
        {
            name: 'email',
            xtype: 'textfield',
            inputType: 'email',
            fieldLabel: 'Почта',
            allowBlank: false,
            validateOnChange: false,
            regex: /.*@.*\.*/
        },
        {
            name: 'password',
            xtype: 'textfield',
            inputType: 'password',
            fieldLabel: 'Пароль',
            validateOnChange: false,
            allowBlank: false
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            items: [
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-key',
                    text: 'Войти',
                    width: 150,
                    handler: 'trySend'
                }
            ]
        },
        {
            flex: 2
        }
    ]
});
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
        width: 500,
		labelWidth: 120
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
            layout: 'vbox',
            items: [
                {
                    boxLabel: 'Клиент, моя компания на сайте.',
                    name: 'type',
                    inputValue: 'company',
                    checked: true
                },
                {
                    boxLabel: 'Партнер, работаем вместе.',
                    name: 'type',
                    inputValue: 'partner'
                }
            ]
        },
        {
            name: 'login',
            xtype: 'textfield',
            inputType: 'email',
            fieldLabel: 'Почта',
            allowBlank: false,
            validateOnChange: false,
            listeners: {
                specialkey: 'trySendIfEnterKey'
            }
        },
        {
            name: 'pass',
            xtype: 'textfield',
            inputType: 'password',
            fieldLabel: 'Пароль',
            validateOnChange: false,
            listeners: {
                specialkey: 'trySendIfEnterKey'
            }
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
                    handler: 'trySend',
                    margin: '0 15 0 0'
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-question',
                    text: 'Забыл пароль',
                    width: 150,
                    handler: 'resetPass'
                }
            ]
        },
        {
            flex: 2
        }
    ]
});
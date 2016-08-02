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
    cls: 'grey-back',

    defaults: {
        width: 500,
		labelWidth: 120,
        msgTarget: 'under',
        validateOnChange: false,
        validateOnBlur: false
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
            xtype: 'fieldcontainer',
            hidden: true,
            fieldLabel: 'Я',
            defaultType: 'radiofield',
            defaults: {
                flex: 1
            },
            layout: 'vbox',
            items: [
                {
                    boxLabel: 'Клиент',
                    name: 'type',
                    inputValue: 'company',
                    checked: true
                },
                {
                    boxLabel: 'Агент',
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
            listeners: {
                specialkey: 'sendIfEnterKey',
                change: 'trimValueOnChange'
            }
        },
        {
            name: 'pass',
            xtype: 'textfield',
            inputType: 'password',
            fieldLabel: 'Пароль',
            listeners: {
                specialkey: 'sendIfEnterKey',
                change: 'trimValueOnChange'
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
                    handler: 'send',
                    margin: '0 15 0 0'
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-question',
                    text: 'Сбросить пароль',
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
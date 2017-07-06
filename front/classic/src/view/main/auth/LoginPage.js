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
            name: 'login',
            xtype: 'textfield',
            inputType: 'email',
            fieldLabel: 'Email',
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
            fieldLabel: 'Password',
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
                    iconCls: 'x-fa fa-question',
                    text: 'Reset password',
                    width: 150,
                    handler: 'resetPass'
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-key',
                    text: 'Log In',
                    width: 150,
                    handler: 'send',
                    margin: '0 15 0 0'
                }
            ]
        },
        {
            flex: 2
        }
    ]
});
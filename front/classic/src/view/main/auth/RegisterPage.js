/**
 * Страница регистрации.
 */
Ext.define('A.view.main.auth.RegisterPage', {
    extend: 'Ext.form.Panel',
    xtype: 'registerPage',
    controller: 'mainAuthRegisterPage',

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
            name: 'partnerCode',
            xtype: 'textfield',
            fieldLabel: 'Код партнера',
            emptyText: 'могли дать наши партнеры, не обязателен',
            validateOnChange: false
        },
        {
            name: 'captcha',
            xtype: 'textfield',
            fieldLabel: 'Код с картинки',
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
                    iconCls: 'x-fa fa-user-plus',
                    text: 'Зарегистрироваться',
                    width: 200,
                    handler: 'trySend'
                }
            ]
        },
        {
            flex: 2
        }
    ]
});
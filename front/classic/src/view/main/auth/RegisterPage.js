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
			xtype: 'fieldcontainer',
			fieldLabel: 'Я',
			defaultType: 'radiofield',
			defaults: {
				flex: 1
			},
			layout: 'vbox',
			items: [
				{
					boxLabel: 'Клиент, хочу разместить свою компанию.',
					name: 'type',
					inputValue: 'company',
					checked: true
				},
				{
					boxLabel: 'Партнер, хочу приглашать клиентов.',
					name: 'type',
					inputValue: 'partner'
				}
			]
		},
        {
            itemId: 'login',
            name: 'login',
            xtype: 'textfield',
            inputType: 'email',
            fieldLabel: 'Почта',
            allowBlank: false,
            validateOnChange: false,
            regex: /.*@.*\.*/,
            listeners: {
                specialkey: 'trySendIfEnterKey'
            }
        },
        {
            itemId: 'partner',
            name: 'partner',
            xtype: 'textfield',
            fieldLabel: 'Код партнера',
            emptyText: 'могли дать наши партнеры, не обязателен',
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
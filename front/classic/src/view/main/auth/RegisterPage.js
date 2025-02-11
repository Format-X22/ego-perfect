/**
 * Страница регистрации.
 */
Ext.define('A.view.main.auth.RegisterPage', {
    extend: 'Ext.form.Panel',
    xtype: 'registerPage',
    controller: 'mainAuthRegisterPage',

    listeners: {
        show: 'updatePartnerKeyOnShow'
    },
    
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
            itemId: 'registerSwitch',
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
            itemId: 'login',
            name: 'login',
            xtype: 'textfield',
            inputType: 'email',
            fieldLabel: 'Почта',
            allowBlank: false,
            regex: /^[^\s]+@[^\s]+\.[^\s]+$/,
            regexText: 'Должно быть похоже на почту вида boss@mail.ru',
            listeners: {
                specialkey: 'trySendIfEnterKey',
                change: 'trimValueOnChange'
            }
        },
        {
            itemId: 'partner',
            name: 'partner',
            xtype: 'textfield',
            fieldLabel: 'Ключ агента',
            emptyText: 'если он у вас есть',
            listeners: {
                specialkey: 'trySendIfEnterKey',
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
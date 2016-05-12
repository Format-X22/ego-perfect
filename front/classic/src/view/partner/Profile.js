/**
 * Профиль партнера.
 */
Ext.define('A.view.partner.Profile', {
    extend: 'Ext.container.Container',
    xtype: 'partnerProfile',
    controller: 'partnerProfile',

    layout: {
        type: 'vbox',
        align: 'center'
    },

    items: [
		{
			xtype: 'adminTopDescription',
			html: 'Настройки вашего аккаунта на этой вкладке.'
		},
        {
            flex: 1
        },
        {
            name: 'email',
            xtype: 'textfield',
            fieldLabel: 'Ваша почта',
            width: 600,
            regex: /^.*@.*\..*$/,
            regexText: Ext.form.field.VTypes.emailText,
            allowBlank: false,
            msgTarget: 'under',
            validateOnChange: false,
            validateOnBlur: false,
            hidden: true
        },
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'right'
            },
            width: 600,
            margin: '0 0 40 0',
            hidden: true,
            items: [
                {
                    xtype: 'button',
                    text: 'Сменить почту',
                    handler: 'changeEmail',
                    width: 200,
                    disabled: true
                }
            ]
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Ваш пароль',
            value: '????????',
            width: 600,
            readOnly: true
        },
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'right'
            },
            width: 600,
            items: [
                {
                    xtype: 'button',
                    text: 'Сбросить пароль',
                    handler: 'resetPassword',
                    width: 200
                }
            ]
        },
        {
            flex: 2
        }
    ]
});
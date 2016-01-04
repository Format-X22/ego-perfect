/**
 * Профиль партнера.
 */
Ext.define('A.view.partner.Profile', {
    extend: 'Ext.form.Panel',
    xtype: 'partnerProfile',

    layout: {
        type: 'vbox',
        align: 'center'
    },

    items: [
        {
            xtype: 'widgetSaveToolbar'
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
            validateOnBlur: false,
            validateOnChange: false
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
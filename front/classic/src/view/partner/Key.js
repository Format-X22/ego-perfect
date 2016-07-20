/**
 * Ключ партнера.
 */
Ext.define('A.view.partner.Key', {
    extend: 'Ext.container.Container',
    xtype: 'partnerKey',

    layout: {
        type: 'vbox',
        align: 'center'
    },

    items: [
        {
            xtype: 'adminTopDescription',
            html: 'Ваш персональный ключ агента.'
        },
        {
            flex: 1
        },
        {
            itemId: 'id',
            name: '_id',
            xtype: 'textfield',
            fieldLabel: 'Ключ',
            readOnly: true,
            width: 620,
            listeners: {
                change: 'updateKeyLink'
            }
        },
        {
            xtype: 'component',
            width: 620,
            padding: '0 0 30 105',
            html:
                '<b>При регистрации клиента ключ необходимо установить<br>' +
                'в поле "Ключ агента"</b>.'
        },
        {
            itemId: 'link',
            xtype: 'textfield',
            fieldLabel: 'Ссылка',
            readOnly: true,
            width: 620
        },
        {
            xtype: 'component',
            width: 620,
            padding: '0 0 30 105',
            html: '<b>При переходе по ссылке ключ установится автоматически.</b>'
        },
        {
            itemId: 'register',
            xtype: 'textfield',
            fieldLabel: 'Прямая регистрация',
            readOnly: true,
            width: 620
        },
        {
            xtype: 'component',
            width: 620,
            padding: '0 0 30 105',
            html: '<b>Альтернативная ссылка, сразу ведет на страницу регистрации.</b>'
        },
        {
            itemId: 'activeFlag',
            name: 'active',
            xtype: 'hidden'
        },
        {
            itemId: 'contractHint',
            xtype: 'component',
            margin: 30,
            width: 620,
            hidden: true,
            html:
                '<b>Необходимо завершить регистрацию подписанием договора.<br>' +
                'Напишите на почту w@фирмы.онлайн или позвоните на номер<br>' +
                '8 (800) 25-00-186.</b>'
        },
        {
            flex: 3
        }
    ]
});
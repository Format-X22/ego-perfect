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
			html:
				'За любых клиентов, зарегистрированных<br>' +
				'с этим ключем, вы получаете денежный бонус<br>' +
                'равный бонусу, указанному в договоре.<br>' +
                'Также вы можете выдавать клиентам ссылку,<br>' +
                'которая автоматически установит ключ.'
		},
        {
            flex: 1
        },
        {
            itemId: 'id',
            name: '_id',
            xtype: 'textfield',
            fieldLabel: 'Ваш ключ',
            readOnly: true,
            width: 620,
            listeners: {
                change: 'updateKeyLink'
            }
        },
        {
            itemId: 'link',
            xtype: 'textfield',
            fieldLabel: 'Ссылка',
            readOnly: true,
            width: 620
        },
        {
            itemId: 'activeFlag',
            name: 'active',
            xtype: 'hidden',
            listeners: {
                change: 'updateContractHint'
            }
        },
        {
            itemId: 'contractHint',
            xtype: 'component',
            margin: 30,
            width: 620,
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
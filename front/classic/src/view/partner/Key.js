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
				'с этим ключем, вы получаете денежный бонус в 40%<br>' +
				'всех его платежей на сайте в течении года<br>' +
				'с даты его регистрации.<br><br>' +
                'Также вы можете выдать клиентам ссылку,<br>' +
                'которая автоматически установит нужный ключ в нужное поле.'
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
                '+7 (925) 154-68-79.</b>'
        },
        {
            flex: 3
        }
    ]
});
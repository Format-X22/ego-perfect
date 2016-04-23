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
				'За любых клиентов или партнеров, зарегистрированных<br>' +
				'с этим ключем, вы получаете денежный бонус.<br><br>' +
				'Если регистрируется клиент - вы получаете 40%<br>' +
				'от всех его оплат на сайте в течении года<br>' +
				'с даты его регистрации.<br><br>' +
				'Если регистрируется партнер - вы получаете 10%<br>' +
				'от всех оплат клиентов, которых приведет партнер,<br>' +
				'в течении года после регистрации этого партнера.<br><br>' +
                'Также вы можете просто выдать клиентам и партнерам ссылку,<br>' +
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
                'Напишите на почту contact@фирмы.онлайн или позвоните на номер<br>' +
                '+7 (925) 154-68-79.</b>'
        },
        {
            flex: 3
        }
    ]
});
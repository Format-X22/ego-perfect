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
				'Если регистрируется клиент - вы получаете 30%<br>' +
				'от всех его оплат на сайте в течении года<br>' +
				'с даты его регистрации.<br><br>' +
				'Если регистрируется партнер - вы получаете 10%<br>' +
				'от всех оплат клиентов, которых приведет партнер,<br>' +
				'в течении года после регистрации этого партнера.'
		},
        {
            flex: 1
        },
        {
            name: 'key',
            xtype: 'textfield',
            fieldLabel: 'Ваш ключ',
            readOnly: true,
            width: 600
        },
        {
            flex: 3
        }
    ]
});
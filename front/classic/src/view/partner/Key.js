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
            xtype: 'component',
            padding: '20',
            width: 600,
            html:
                '<i>За любых клиентов или партнеров, зарегистрированных с этим ключем, ' +
                'вы получаете денежный бонус. Если регистрируется клиент - вы получаете ' +
                '25% от всех его трат на сайте в течении года после его первой траты. ' +
                'Если регистрируется партнер - вы получаете 10% от всех ' +
                'трат клиентов, которых приведет партнер, в течении года после регистрации этого партнера.</i>'
        },
        {
            flex: 2
        }
    ]
});
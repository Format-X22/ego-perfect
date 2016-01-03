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
                '25% от всех его трат на сайте. Если регистрируется партнер - вы получаете 10% от всех ' +
                'трат клиентов, которых приведет партнер.</i>'
        },
        {
            flex: 2
        }
    ]
});
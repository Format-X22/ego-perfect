/**
 * Вкладка оплаты.
 */
Ext.define('A.view.client.Pay', {
    extend: 'Ext.form.Panel',
    xtype: 'clientPay',

    layout: {
        type: 'vbox'
    },

    items: [
        {
            xtype: 'adminTopDescription',
            html: 'Вкладка оплаты услуг сервиса.'
        },
        {
            name: 'payDate',
            xtype: 'displayfield',
            fieldLabel: 'Сервис оплачен до',
            labelWidth: 145,
            padding: '0 40',
            readOnly: true,
            renderer: function (value) {
                var date = Ext.Date.parse(value, 'c');
                var format = Ext.Date.format(date, 'd.m.Y');
                
                return '<b>' + format + '</b>';
            }
        },
        {
            flex: 1
        },
        {
            xtype: 'container',
            width: '100%',
            height: 200,
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'component',
                    html: '<b>Платные услуги будут доступны после 11 мая.</b>'
                }
            ]
        },
        {
            flex: 3
        }
    ]
});
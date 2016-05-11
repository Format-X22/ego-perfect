/**
 * Контейнер вкладки оплаты.
 */
Ext.define('A.view.client.pay.Container', {
    extend: 'Ext.form.Panel',
    controller: 'clientPay',
    xtype: 'clientPayContainer',

    layout: {
        type: 'fit'
    },

    items: [
        {
            xtype: 'tabpanel',
            items: [
                {
                    xtype: 'clientPayForm',
                    title: 'Форма оплаты',
                    iconCls: 'x-fa fa-rub'
                },
                {
                    xtype: 'clientPayBankMemo',
                    title: 'Памятка Банка России',
                    iconCls: 'x-fa fa-file-text-o'
                }
            ]
        }
    ]
});
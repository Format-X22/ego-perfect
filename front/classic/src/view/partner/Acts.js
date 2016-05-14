/**
 * Виджет данных для составления актов.
 */
Ext.define('A.view.partner.Acts', {
    extend: 'Ext.container.Container',
    xtype: 'partnerActs',

    layout: {
        type: 'vbox',
        align: 'center'
    },

    items: [
        {
            xtype: 'adminTopDescription',
            html:
                '?'
        },
        {
            flex: 1
        },
        {
            name: 'reservedMoneyCount',
            xtype: 'displayfield',
            fieldLabel: 'Доступно для получения',
            labelWidth: 190,
            value: 0,
            renderer: function (value) {
                return '<b>' + value + ' рублей</b>';
            }
        },
        {
            flex: 1
        },
        {
            itemId: 'clientsPayGrid',
            xtype: 'grid',
            title: 'Таблица платежей клиентов, приведенных вами',
            width: 1000,
            minHeight: 200,
            border: true,
            emptyText: 'Платежей не было',
            viewConfig: {
                deferEmptyText: false
            },
            columns: [
                {
                    dataIndex: 'name',
                    text: 'Имя компании',
                    width: 250
                },
                {
                    dataIndex: 'login',
                    text: 'Логин',
                    width: 150
                },
                {
                    dataIndex: 'count',
                    text: 'Платеж,<br>рублей',
                    width: 150
                },
                {
                    dataIndex: 'date',
                    text: 'Дата',
                    width: 150
                },
                {
                    dataIndex: 'percent',
                    text: 'Ваш процент,<br>рублей',
                    width: 150
                },
                {
                    dataIndex: 'done',
                    text: 'Выплачено',
                    width: 150
                }
            ]              
        },
        {
            flex: 4
        }
    ]
});
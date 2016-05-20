/**
 * Виджет данных для составления актов.
 */
Ext.define('A.view.partner.Acts', {
    extend: 'Ext.container.Container',
    xtype: 'partnerActs',
    
    layout: 'fit',
    
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'center'
            },

            items: [
                {
                    xtype: 'adminTopDescription',
                    html:
                        'Информация для составления актов.<br>' +
                        'Содержит информацию по платежам клиентов, привлеченных вами,<br>' +
                        'а так же клиентов, которых привлекли партнеры, привлеченные вами.'
                },
                {
                    name: 'reservedMoneyCount',
                    xtype: 'displayfield',
                    fieldLabel: 'Доступно для получения',
                    labelWidth: 190,
                    padding: '20 0 10 0',
                    value: 0,
                    renderer: function (value) {
                        return '<b>' + Ext.util.Format.currency(value, " ", 2, false) + ' рублей</b>';
                    }
                },
                {
                    itemId: 'clientsPayGrid',
                    xtype: 'grid',
                    title: 'Таблица платежей клиентов',
                    width: 1000,
                    resizable: 'e w',
                    flex: 1,
                    scrollable: 'vertical',
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
                            xtype:'templatecolumn',
                            tpl: '{count:currency(" ", 2, false)}',
                            align: 'right',
                            text: 'Платеж,<br>рублей',
                            width: 150
                        },
                        {
                            dataIndex: 'date',
                            xtype: 'datecolumn',
                            format:'d.m.Y',
                            align: 'center',
                            text: 'Дата',
                            width: 150
                        },
                        {
                            dataIndex: 'percent',
                            xtype:'templatecolumn',
                            tpl: '{percent:currency(" ", 2, false)}',
                            align: 'right',
                            text: 'Ваш процент,<br>рублей',
                            width: 150
                        },
                        {
                            dataIndex: 'done',
                            xtype:'templatecolumn',
                            tpl:
                                '<span class="' +
                                    'x-fa fa-<tpl if="done">check-</tpl>square-o' +
                                '"></span>',
                            align: 'center',
                            text: 'Выплачено',
                            flex: 1
                        }
                    ]
                }
            ]
        }
    ]
});
Ext.define('A.view.main.company.Summary', {
    extend: 'Ext.Container',
    xtype: 'companySummary',

    layout: 'vbox',
    scrollable: 'vertical',

    items: [
        {
            xtype: 'component',
            bind: {
                html: '{rating}'
            }
        },
        {
            xtype: 'component',
            flex: 1,
            bind: {
                html: '{summary}'
            }
        },
        {
            xtype: 'fieldset',
            title: 'Контакты',
            items: [
                {
                    xtype: 'textfield',
                    readOnly: true,
                    label: 'Телефон',
                    bind: {
                        value: '{phone}'
                    }
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    label: 'Сайт',
                    bind: {
                        value: '{site}'
                    }
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    label: 'Почта',
                    bind: {
                        value: '{mail}'
                    }
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    label: 'Время работы',
                    bind: {
                        value: '{time}'
                    }
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    label: 'Адрес',
                    bind: {
                        value: '{address}'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    bind: {
                        iconCls: 'x-fa fa-{socialIconN1}',
                        href: '{socialHrefN1}'
                    }
                },
                {
                    xtype: 'button',
                    bind: {
                        iconCls: 'x-fa fa-{socialIconN2}',
                        href: '{socialHrefN2}'
                    }
                },
                {
                    xtype: 'button',
                    bind: {
                        iconCls: 'x-fa fa-{socialIconN3}',
                        href: '{socialHrefN3}'
                    }
                },
                {
                    xtype: 'button',
                    bind: {
                        iconCls: 'x-fa fa-{socialIconN4}',
                        href: '{socialHrefN4}'
                    }
                }
            ]
        }
    ]
});
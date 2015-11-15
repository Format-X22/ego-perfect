Ext.define('A.view.main.company.tablet.Summary', {
    extend: 'Ext.Container',
    xtype: 'companySummaryTablet',

    cls: 'company-summary-tablet',
    layout: 'vbox',
    scrollable: 'vertical',

    defaults: {
        padding: '15 15 0 15'
    },

    items: [
        {
            xtype: 'component',
            bind: {
                html: '<span class="rating-title">Рейтинг организации:</span> {rating}'
            }
        },
        {
            xtype: 'container',
            layout: 'hbox',
            flex: 1,
            items: [
                {
                    xtype: 'img',
                    width: 300,
                    height: 300,
                    src: 'http://www.wilsoninfo.com/300x300.gif'
                },
                {
                    xtype: 'component',
                    flex: 1,
                    padding: '0 5 20 20',
                    bind: {
                        html: '{summary}'
                    }
                }
            ]
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
                /*{
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
                }*/
            ]
        }
    ]
});
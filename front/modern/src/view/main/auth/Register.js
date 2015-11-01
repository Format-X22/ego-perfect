Ext.define('A.view.main.Register', {
    extend: 'Ext.container.Container',
    xtype: 'register',

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'justify'
    },
    height: '100%',

    items: [
        {
            flex: 1
        },
        {
            xtype: 'emailfield',
            label: 'Почта',
            labelWidth: 70,
            width: '100%',
            maxWidth: 500,
            margin: '0 0 7 0'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '7 0 0 0',
            width: '100%',
            maxWidth: 500,
            items: [
                {
                    flex: 1
                },
                {
                    xtype: 'button',
                    ui: 'mobile-search',
                    html: 'Получить письмо',
                    iconCls: 'x-fa fa-envelope',
                    height: 35,
                    width: 200
                }
            ]
        },
        {
            flex: 1
        }
    ]
});
Ext.define('A.view.main.search.StartDesktopSearch', {
    extend: 'Ext.container.Container',
    xtype: 'startDesktopSearch',

    flex: 1,
    padding: 10,
    layout: {
        type: 'vbox',
        align: 'center'
    },

    items: [
        {
            flex: 1
        },
        {
            xtype: 'image',
            width: 240,
            height: 150,
            src: '/resources/logo.svg'
        },
        {
            xtype: 'component',
            padding: '0 0 10 0',
            html: 'Все компании на одном сайте'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            width: '90%',
            maxWidth: 500,
            items: [
                {
                    itemId: 'searchInput',
                    xtype: 'textfield',
                    border: 1,
                    emptyText: 'Введите запрос, например - кафе в Москве',
                    submitEmptyText: false,
                    flex: 1
                },
                {
                    itemId: 'searchButton',
                    xtype: 'button',
                    //ui: 'search-with-text',
                    html: 'Искать',
                    iconCls: 'x-fa fa-search'
                }
            ]
        },
        {
            flex: 2
        }
    ]
});
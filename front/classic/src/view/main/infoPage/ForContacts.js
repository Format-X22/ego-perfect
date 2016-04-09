/**
 * Страница с контактными данными.
 */
Ext.define('A.view.main.infoPage.ForContacts', {
    extend: 'A.view.main.infoPage.AbstractPage',
    xtype: 'pageForContacts',
    store: 'pageForContacts',

    requires: [
        'A.store.PageForContacts'
    ],
    
    items: [
        {
            flex: 1
        },
        {
            xtype: 'dataview',
            tpl:
                '<tpl for=".">' +
                    '<div class="item info-comic-icon">' +
                        '<img src="{url}">' +
                        '<div class="header">{header}</div>' +
                        '<div class="description">{description}</div>' +
                    '</div>' +
                '</tpl>',
            itemSelector: '.item'
        },
        {
            flex: 2
        }
    ]
});
/**
 * Страница для партнеров.
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
            xtype: 'dataview',
            useComponents: true,
            inline: true,
            defaultType: 'infoComicIcon',
            scrollable: false
        }
    ]
});
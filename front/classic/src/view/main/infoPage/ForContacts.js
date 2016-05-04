/**
 * Страница с контактными данными.
 */
Ext.define('A.view.main.infoPage.ForContacts', {
    extend: 'A.view.main.infoPage.AbstractPage',
    xtype: 'pageForContacts',
    store: 'pageForContacts',

    requires: [
        'A.store.PageForContacts'
    ]
});
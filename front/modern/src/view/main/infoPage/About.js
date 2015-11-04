/**
 * Вью страницы о нас.
 */
Ext.define('A.view.main.infoPage.About', {
    extend: 'A.view.main.infoPage.AbstractPage',
    xtype: 'pageAbout',
    store: 'pageAbout',

    requires: [
        'A.store.PageAbout'
    ]
});
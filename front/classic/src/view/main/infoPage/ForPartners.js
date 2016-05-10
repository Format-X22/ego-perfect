/**
 * Виджет с презентацией для партнеров.
 */
Ext.define('A.view.main.infoPage.ForPartners', {
    extend: 'A.view.main.infoPage.AbstractPage',
    xtype: 'pageForPartners',
    store: 'pageForPartners',

    requires: [
        'A.store.PageForPartners'
    ]
});
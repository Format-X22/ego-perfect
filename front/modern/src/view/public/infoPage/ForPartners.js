/**
 * Страница для партнеров.
 */
Ext.define('A.view.public.infoPage.ForPartners', {
    extend: 'A.view.public.infoPage.AbstractPage',
    xtype: 'pageForPartners',
    store: 'pageForPartners',

    requires: [
        'A.store.PageForPartners'
    ]
});
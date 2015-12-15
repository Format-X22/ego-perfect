/**
 * Страница для клиентов.
 */
Ext.define('A.view.public.infoPage.ForClients', {
    extend: 'A.view.public.infoPage.AbstractPage',
    xtype: 'pageForClients',
    store: 'pageForClients',

    requires: [
        'A.store.PageForClients'
    ]
});
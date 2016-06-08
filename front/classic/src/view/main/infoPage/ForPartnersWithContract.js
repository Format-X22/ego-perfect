/**
 * Страница с информацией для партнеров и текстом договора.
 */
Ext.define('A.view.main.infoPage.ForPartnersWithContract', {
    extend: 'Ext.tab.Panel',
    xtype: 'pageForPartnersWithContract',
    controller: 'infoPageMultiTab',

    require: [
        'A.view.main.infoPage.ForPartners',
        'A.view.main.infoPage.PartnersContract',
        'A.view.main.infoPage.MultiTabController'
    ],

    listeners: {
        tabchange: 'updateTabLink'
    },
    
    items: [
        {
            itemId: 'show',
            xtype: 'pageForPartners',
            title: 'Презентация',
            iconCls: 'x-fa fa-eye'
        },
        {
            itemId: 'contract',
            xtype: 'partnersContract',
            title: 'Текст договора',
            iconCls: 'x-fa fa-file-text-o'
        }
    ]
});
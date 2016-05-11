/**
 * Страница с информацией для партнеров и текстом договора.
 */
Ext.define('A.view.main.infoPage.ForPartnersWithContract', {
    extend: 'Ext.tab.Panel',
    xtype: 'pageForPartnersWithContract',

    require: [
        'A.view.main.infoPage.ForPartners',
        'A.view.main.infoPage.PartnersContract'
    ],

    items: [
        {
            xtype: 'pageForPartners',
            title: 'Презентация',
            iconCls: 'x-fa fa-eye'
        },
        {
            xtype: 'partnersContract',
            title: 'Текст договора',
            iconCls: 'x-fa fa-file-text-o'
        }
    ]
});
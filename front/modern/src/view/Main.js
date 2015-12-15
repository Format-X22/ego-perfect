/**
 * Главный виджет сайта для мобильников и планшетов.
 */
Ext.define('A.view.Main', {
    extend: 'Ext.container.Container',
    xtype: 'appMain',

    requires: [
        'A.view.public.Main'
    ],

    fullscreen: true,
    layout: 'card',

    items: [
        {
            xtype: 'appMainPublic'
        },
        {
            xtype: 'appMainClient'
        },
        {
            xtype: 'appMainPartner'
        }
    ]
});

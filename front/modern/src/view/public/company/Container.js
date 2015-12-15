/**
 * Контейнер виджета деталей компании.
 */
Ext.define('A.view.public.company.Container', {
    extend: 'Ext.Container',
    xtype: 'companyContainer',
    viewModel: 'companyContainer',

    requires: [
        'A.view.public.company.mobile.TabPanel',
        'A.view.public.company.tablet.TabPanel'
    ],

    layout: 'vbox',

    items: [
        {
            xtype: 'toolbar',
            hidden: true,
            bind: {
                title: '{name}'
            },
            plugins: 'responsive',
            responsiveConfig: {
                'width < 600 || height < 400': {
                    hidden: true
                },
                'width >= 600 && height >= 400': {
                    hidden: false
                }
            },
            items: [
                '->',
                {
                    itemId: 'backToSearch',
                    xtype: 'button',
                    text: 'Назад',
                    iconCls: 'x-fa fa-chevron-left'
                }
            ]
        },
        {
            companyDetailsTabPanel: true,
            xtype: 'companyTabPanelMobile',
            flex: 1,
            plugins: 'responsive',
            responsiveConfig: {
                'width < 600 || height < 400': {
                    hidden: false
                },
                'width >= 600 && height >= 400': {
                    hidden: true
                }
            }
        },
        {
            companyDetailsTabPanel: true,
            xtype: 'companyTabPanelTablet',
            flex: 1,
            plugins: 'responsive',
            responsiveConfig: {
                'width < 600 || height < 400': {
                    hidden: true
                },
                'width >= 600 && height >= 400': {
                    hidden: false
                }
            }
        }
    ]
});
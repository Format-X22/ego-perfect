/**
 * Контейнер деталей компании.
 */
Ext.define('A.view.main.company.Container', {
    extend: 'Ext.Container',
    xtype: 'companyContainer',
    controller: 'companyContainer',
    viewModel: 'companyContainer',

    requires: [
        'A.view.main.company.Controller',
        'A.view.main.company.mobile.TabPanel',
        'A.view.main.company.tablet.TabPanel'
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
    ],

    /**
     * Оповещает о том что данные компании загружены.
     */
    notifyCompanyLoad: function () {

        /**
         * @event companyLoaded
         * Происходит после загрузки и добавления в вью-модель данных компании.
         * @param {A.view.main.company.Container} this Этот контейнер.
         */
        this.fireEvent('companyLoaded', this);
    }
});
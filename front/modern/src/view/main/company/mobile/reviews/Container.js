/**
 * Контейнер со списком отзывов о отправкой новых отзывов.
 */
Ext.define('A.view.main.company.mobile.reviews.Container', {
    extend: 'Ext.container.Container',
    xtype: 'companyMobileReviewsContainer',

    requires: [
        'A.view.main.company.mobile.reviews.List',
        'A.view.main.company.mobile.reviews.Send'
    ],

    title: 'Отзывы',
    height: '100%',

    layout: {
        type: 'hbox',
        pack: 'center'
    },

    items: [
        {
            xtype: 'tabpanel',
            width: '100%',
            height: '100%',
            padding: '15 0',
            layout: {
                type: 'card',
                animation: 'flip'
            },
            defaults: {
                tab: {
                    iconAlign: 'top',
                    flex: 1,
                    labelCls: 'no-tab-label'
                }
            },
            items: [
                {
                    xtype: 'companyMobileReviewsList',
                    iconCls: 'x-fa fa-th-list'
                },
                {
                    xtype: 'companyMobileReviewsSend',
                    iconCls: 'x-fa fa-pencil'
                }
            ]
        }
    ]
});
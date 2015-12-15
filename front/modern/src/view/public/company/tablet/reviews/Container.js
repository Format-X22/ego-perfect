/**
 * Контейнер со списком отзывов о отправкой новых отзывов.
 */
Ext.define('A.view.public.company.tablet.reviews.Container', {
    extend: 'Ext.container.Container',
    xtype: 'companyTabletReviewsContainer',

    requires: [
        'A.view.public.company.tablet.reviews.List',
        'A.view.public.company.tablet.reviews.Send'
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
                    minWidth: '15%'
                }
            },
            items: [
                {
                    xtype: 'companyTabletReviewsList',
                    title: 'Все отзывы',
                    iconCls: 'x-fa fa-th-list'
                },
                {
                    xtype: 'companyTabletReviewsSend',
                    title: 'Оставить свой отзыв',
                    iconCls: 'x-fa fa-pencil'
                }
            ]
        }
    ]
});
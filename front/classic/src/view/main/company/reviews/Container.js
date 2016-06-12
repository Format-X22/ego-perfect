/**
 * Контейнер со списком отзывов о отправкой новых отзывов.
 */
Ext.define('A.view.main.company.reviews.Container', {
    extend: 'Ext.container.Container',
    xtype: 'companyReviewsContainer',

    requires: [
        'A.view.main.company.reviews.List',
        'A.view.main.company.reviews.Send'
    ],

    layout: {
        type: 'hbox'
    },

    width: '100%',
    height: '100%',

    items: [
        {
            itemId: 'reviewsTabPanel',
            xtype: 'tabpanel',
            width: '100%',
            height: '100%',
            padding: '15 0',
            items: [
                {
                    itemId: 'list',
                    xtype: 'companyReviewsList'
                },
                {
                    itemId: 'send',
                    xtype: 'companyReviewsSend'
                }
            ]
        }
    ]
});
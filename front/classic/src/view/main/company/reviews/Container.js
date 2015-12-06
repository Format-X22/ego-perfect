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
        type: 'hbox',
        pack: 'center'
    },

    height: '100%',

    items: [
        {
            xtype: 'tabpanel',
            width: 900,
            height: '100%',
            padding: '15 0',
            items: [
                {
                    xtype: 'companyReviewsList'
                },
                {
                    xtype: 'companyReviewsSend'
                }
            ]
        }
    ]
});
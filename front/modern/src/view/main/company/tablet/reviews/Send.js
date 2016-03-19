/**
 * Виждет отправки своего отзыва.
 */
Ext.define('A.view.main.company.tablet.reviews.Send', {
    extend: 'Ext.container.Container',
    xtype: 'companyTabletReviewsSend',
    controller: 'companyReviewsSend',

    requires: [
        'A.view.main.company.reviews.SendController'
    ],

    cls: 'company-tablet-reviews-send',

    layout: {
        type: 'hbox',
        pack: 'center'
    },
    items: [
        {
            itemId: 'reviewForm',
            xtype: 'formpanel',
            padding: 10,
            width: 600,
            defaults: {
                margin: 5
            },
            items: [
                {
                    name: 'name',
                    xtype: 'textfield',
                    placeHolder: 'Имя',
                    maxLength: 100,
                    component: {
                        autoComplete: false,
                        autoCapitalize: false,
                        autoCorrect: false
                    }
                },
                {
                    name: 'header',
                    xtype: 'textfield',
                    placeHolder: 'Заголовок',
                    maxLength: 100,
                    component: {
                        autoComplete: false,
                        autoCapitalize: false,
                        autoCorrect: false
                    }
                },
                {
                    name: 'description',
                    xtype: 'textareafield',
                    cls: 'review-textarea',
                    placeHolder: 'Отзыв',
                    height: 120,
                    maxLength: 1000,
                    border: 1,
                    component: {
                        autoComplete: false,
                        autoCapitalize: false,
                        autoCorrect: false
                    }
                },
                {
                    itemId: 'rating',
                    name: 'rating',
                    xtype: 'hiddenfield',
                    value: 5
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10 0',
                    padding: '10 0',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                padding: 10,
                                margin: '0 10'
                            },
                            items: [
                                {
                                    itemId: 'star1',
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-star',
                                    handler: 'set1star',
                                    margin: '0 10 0 5'
                                },
                                {
                                    itemId: 'star2',
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-star',
                                    handler: 'set2star'
                                },
                                {
                                    itemId: 'star3',
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-star',
                                    handler: 'set3star'
                                },
                                {
                                    itemId: 'star4',
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-star',
                                    handler: 'set4star'
                                },
                                {
                                    itemId: 'star5',
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-star',
                                    handler: 'set5star'
                                }
                            ]
                        },
                        {
                            flex: 1
                        },
                        {
                            itemId: 'showCaptcha',
                            xtype: 'button',
                            text: 'Отправить',
                            handler: 'send'
                        }
                    ]
                }
            ]
        }
    ]
});
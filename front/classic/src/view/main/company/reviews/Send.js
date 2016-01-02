/**
 * Виждет отправки своего отзыва.
 */
Ext.define('A.view.main.company.reviews.Send', {
    extend: 'Ext.container.Container',
    xtype: 'companyReviewsSend',
    controller: 'companyReviewsSend',

    requires: [
        'A.view.main.company.reviews.SendController'
    ],

    title: 'Оставить свой отзыв',
    iconCls: 'x-fa fa-pencil',
    layout: {
        type: 'hbox',
        pack: 'center'
    },
    items: [
        {
            itemId: 'reviewForm',
            xtype: 'form',
            padding: 10,
            defaults: {
                width: 700
            },
            items: [
                {
                    name: 'name',
                    xtype: 'textfield',
                    fieldLabel: 'Имя',
                    maxLength: 100,
                    allowBlank: false
                },
                {
                    name: 'header',
                    xtype: 'textfield',
                    fieldLabel: 'Заголовок',
                    maxLength: 100,
                    allowBlank: false
                },
                {
                    name: 'description',
                    xtype: 'textarea',
                    fieldLabel: 'Отзыв',
                    height: 120,
                    maxLength: 1000,
                    allowBlank: false
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10 0',
                    items: [
                        {
                            flex: 2
                        },
                        {
                            itemId: 'rating',
                            name: 'rating',
                            xtype: 'displayfield',
                            fieldLabel: 'Оценка',
                            labelWidth: 50,
                            margin: '2 5 0 0',
                            width: 65,
                            value: 3
                        },
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
                                    handler: 'set1star'
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
                                    iconCls: 'x-fa fa-star-o',
                                    handler: 'set4star'
                                },
                                {
                                    itemId: 'star5',
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-star-o',
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
                            handler: 'showCaptchaBlock'
                        }
                    ]
                },
                {
                    itemId: 'captchaInputContainer',
                    xtype: 'container',
                    hidden: true,
                    layout: 'hbox',
                    items: [
                        {
                            flex: 1
                        },
                        {
                            itemId: 'captchaInput',
                            name: 'captcha',
                            xtype: 'textfield',
                            disabled: true,
                            fieldLabel: 'Вы точно не робот?',
                            labelWidth: 130,
                            width: 225,
                            maxLength: 10,
                            allowBlank: false
                        }
                    ]
                },
                {
                    itemId: 'captchaImageContainer',
                    xtype: 'container',
                    hidden: true,
                    layout: 'hbox',
                    width: 700,
                    items: [
                        {
                            flex: 1
                        },
                        {
                            xtype: 'image'
                        }
                    ]
                },
                {
                    itemId: 'sendWithCaptchaContainer',
                    xtype: 'container',
                    hidden: true,
                    layout: 'hbox',
                    margin: '10 0',
                    items: [
                        {
                            flex: 1
                        },
                        {
                            itemId: 'send',
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
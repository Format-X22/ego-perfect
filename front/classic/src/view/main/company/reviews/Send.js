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
    layout: {
        type: 'hbox',
        pack: 'center'
    },
    items: [
        {
            itemId: 'reviewForm',
            xtype: 'form',
            padding: '100 10',
            defaults: {
                width: 700,
                msgTarget: 'under',
                validateOnChange: false,
                validateOnBlur: false
            },
            items: [
                {
                    name: 'name',
                    xtype: 'textfield',
                    emptyText: 'Имя',
                    maxLength: 100,
                    allowBlank: false
                },
                {
                    name: 'header',
                    xtype: 'textfield',
                    emptyText: 'Заголовок',
                    maxLength: 100,
                    allowBlank: false
                },
                {
                    name: 'description',
                    xtype: 'textarea',
                    emptyText: 'Отзыв',
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
                            submitValue: true,
                            xtype: 'displayfield',
                            fieldLabel: 'Оценка',
                            labelWidth: 60,
                            margin: '2 15 0 0',
                            width: 65,
                            value: 5
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
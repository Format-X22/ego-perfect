/**
 * Список отзывов о компании.
 */
Ext.define('A.view.main.company.reviews.List', {
    extend: 'Ext.container.Container',
    xtype: 'companyReviewsList',

    title: 'Все отзывы',
    iconCls: 'x-fa fa-th-list',
    height: '100%',

    items: [
        {
            xtype: 'toolbar',
            height: 0,
            padding: 0,
            cls: 'shadow-toolbar',
            width: '100%'
        },
        {
            xtype: 'container',
            scrollable: 'vertical',
            layout: 'vbox',
            height: '100%',
            items: [
                {
                    itemId: 'reviewsList',
                    xtype: 'dataview',
                    cls: 'company-reviews-list',
                    itemSelector: '.review-item',
                    width: '100%',
                    tpl:
                        '<tpl for=".">' +
                            '<div class="review-item">' +
                                '<div class="star x-fa fa-star"></div>' +
                                '<div class="star x-fa fa-star{[values.rating > 1 ? "" : "-o" ]}"></div>' +
                                '<div class="star x-fa fa-star{[values.rating > 2 ? "" : "-o" ]}"></div>' +
                                '<div class="star x-fa fa-star{[values.rating > 3 ? "" : "-o" ]}"></div>' +
                                '<div class="star x-fa fa-star{[values.rating > 4 ? "" : "-o" ]}"></div>' +
                                '<div class="name">{name}</div>' +
                                '<div class="header">{header}</div>' +
                                '<div class="description">{description}</div>' +
                                '<div class="id">{date:date("d.m.Y")}</div>' +
                            '</div>' +
                        '</tpl>'
                }
            ]
        }
    ],

    /**
     * @inheritdoc
     */
    initComponent: function () {
        this.callParent(arguments);

        this.on('afterrender', function () {
            var list = this.down('#reviewsList');

            if (!list.getStore()) {
                list.setStore(
                    list.up('companyContainer').getViewModel().get('reviews')
                );
            }
        });
    }
});
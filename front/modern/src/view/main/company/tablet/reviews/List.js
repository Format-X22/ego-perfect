/**
 * Список отзывов о компании.
 */
Ext.define('A.view.main.company.tablet.reviews.List', {
    extend: 'Ext.container.Container',
    xtype: 'companyTabletReviewsList',

    height: '100%',
    layout: 'hbox',
    scrollable: 'vertical',

    items: [
        {
            itemId: 'reviewsList',
            xtype: 'dataview',
            cls: 'company-reviews-list',
            itemSelector: '.review-item',
            width: '100%',
            emptyText: '<div class="empty-reviews">Пока ещё ни одного отзыва.<br>Оставьте первый!</div>',
            itemTpl:
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
                '</div>'
        }
    ],

    /**
     * @inheritdoc
     */
    initialize: function () {
        this.callParent(arguments);

        this.on('painted', this.setStoreIfDirectLink, this);
    },

    privates: {

        /**
         * @private
         */
        deferRestoreStore: function () {
            Ext.defer(function () {
                this.setStoreIfDirectLink();
            }, 200, this);
        },

        /**
         * @private
         */
        setStoreIfDirectLink: function () {
            var list = this.down('#reviewsList');
            var container = list.up('companyContainer');

            if (container) {
                list.setStore(container.getViewModel().get('reviews'));
            } else {
                this.deferRestoreStore();
            }
        }
    }
});
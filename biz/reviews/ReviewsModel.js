/**
 * Модель параметров сохранения отзывов.
 */
Ext.define('B.biz.reviews.ReviewsModel', {
    extend: 'Ext.data.Model',

    requires: [
        'B.field.MongoId'
    ],

    fields: [
        {
            name: 'id',
            type: 'mongoId'
        },
        {
            name: 'name',
            type: 'string',
            validators: {
                type: 'length',
                min: 3,
                max: 100
            }
        },
        {
            name: 'header',
            type: 'string',
            validators: {
                type: 'length',
                min: 3,
                max: 200
            }
        },
        {
            name: 'description',
            type: 'string',
            validators: {
                type: 'length',
                min: 3,
                max: 2000
            }
        },
        {
            name: 'captcha',
            type: 'string',
            validators: {
                type: 'presence'
            }
        },
        {
            name: 'rating',
            type: 'int',
            validators: {
                type: 'range',
                min: 1,
                max: 5
            }
        }
    ]
});
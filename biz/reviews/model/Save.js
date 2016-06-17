/**
 * Модель параметров сохранения отзывов.
 */
Ext.define('B.biz.reviews.model.Save', {
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
                min: 1,
                max: 100
            }
        },
        {
            name: 'header',
            type: 'string',
            validators: {
                type: 'length',
                min: 1,
                max: 100
            }
        },
        {
            name: 'description',
            type: 'string',
            validators: {
                type: 'length',
                min: 1,
                max: 1000
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
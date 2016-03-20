/**
 * Модель параметров получения списка отзывов.
 */
Ext.define('B.biz.reviews.model.Get', {
    extend: 'Ext.data.Model',

    requires: [
        'B.field.MongoId'
    ],

    fields: [
        {
            name: 'id',
            type: 'mongoId'
        }
    ]
});
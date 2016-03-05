/**
 * Модель параметров получения данных компании.
 */
Ext.define('B.biz.company.CompanyModel', {
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
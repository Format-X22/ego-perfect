/**
 * Модель параметров получения данных компании.
 */
Ext.define('B.biz.company.CompanyModel', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id',
            type: 'string',
            convert: function (value) {
                if (!value) {
                    return null;
                }

                try {
                    return B.Mongo.makeId(value);
                } catch (error) {
                    return null;
                }
            },
            validators: {
                type: 'presence'
            }
        }
    ]
});
/**
 * Модель данных клиента.
 */
Ext.define('A.model.Client', {
    extend: 'Ext.data.Model',

    requires: [
        'A.model.field.Store',
        'A.model.Stats',
        'A.store.reader.Standard'
    ],

    fields: [
        {name: 'id',    type: 'string'},
        {name: 'email', type: 'string'},

        {name: 'name',         type: 'string'},
        {name: 'phone',        type: 'string'},
        {name: 'site',         type: 'string'},
        {name: 'companyEmail', type: 'string'},
        {name: 'time',         type: 'string'},
        {name: 'address',      type: 'string'},
        {name: 'summary',      type: 'string'},
        {name: 'photo1',       type: 'string'},
        {name: 'photo2',       type: 'string'},
        {name: 'photo3',       type: 'string'},
        {name: 'photo4',       type: 'string'},
        {name: 'photo5',       type: 'string'},
        {name: 'photo6',       type: 'string'},
        {name: 'photo7',       type: 'string'},
        {name: 'photo8',       type: 'string'},
        {name: 'photo9',       type: 'string'},
        {name: 'photo10',      type: 'string'},
        {name: 'word1',        type: 'string'},
        {name: 'word2',        type: 'string'},
        {name: 'word3',        type: 'string'},
        {name: 'word4',        type: 'string'},
        {name: 'word5',        type: 'string'},
        {name: 'word6',        type: 'string'},
        {name: 'word7',        type: 'string'},
        {name: 'word8',        type: 'string'},
        {name: 'word9',        type: 'string'},
        {name: 'word10',       type: 'string'},

        {name: 'rating',  type: 'store', model: 'A.model.Stats'},
        {name: 'views',   type: 'store', model: 'A.model.Stats'},
        {name: 'reviews', type: 'store', model: 'A.model.Stats'},
        {name: 'stars',   type: 'store', model: 'A.model.Stats'},

        {
            name: 'map',
            convert: function (value) {
                if (value) {
                    return value.lat + ', ' + value.lng;
                }

                return '';
            }
        }
    ],

    proxy: {
        type: 'ajax',
        url: '/api/client',
        reader: 'standard'
    }
});
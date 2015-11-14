/**
 * Стор с детальным описанием компании.
 */
Ext.define('A.store.Company', {
    extend: 'Ext.data.Store',
    singleton: true,
    storeId: 'company',

    model: 'A.model.Company',

    proxy: {
        type: 'memory'
    },

    data: [
        {
            id: 1,
            name: 'Тест 1',
            rating: 5,
            phone: 'Тест',
            site: 'Тест',
            mail: 'Тест',
            time: 'Тест',
            address: 'Тест',
            socialHrefN1: 'Тест',
            socialHrefN2: 'Тест',
            socialHrefN3: 'Тест',
            socialHrefN4: 'Тест',
            summary: 'Тест',
            gallery: [],
            reviews: [
                {
                    id: 0,
                    raiting: 0,
                    name: '',
                    header: '',
                    description: ''
                }
            ],
            map: []
        }
    ]
});
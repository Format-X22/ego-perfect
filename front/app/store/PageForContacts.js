/**
 * Стор страницы контактов.
 */
Ext.define('A.store.PageForContacts', {
    extend: 'Ext.data.Store',
    singleton: true,
    storeId: 'pageForContacts',

    model: 'A.model.InfoPage',

    proxy: {
        type: 'memory'
    },

    data: [
        {
            id: 1,
            url: '/resources/img/contacts1.svg',
            header: 'Единая связь',
            description:
                'По любому вопросу вы<br>' +
                'всегда можете<br>' +
                'написать на почту<br>' +
                '<a class="link" href="mailto:contact@фирмы.онлайн">contact@фирмы.онлайн</a><br>' +
                'или позвонить на номер<br>' +
                '8 (925) 154-68-79'
        }
    ]
});
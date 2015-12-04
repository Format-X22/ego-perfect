/**
 * Стор страницы для партнеров.
 */
Ext.define('A.store.PageForPartners', {
    extend: 'Ext.data.Store',
    singleton: true,
    storeId: 'pageForPartners',

    model: 'A.model.InfoPage',

    proxy: {
        type: 'memory'
    },

    data: [
        {
            id: 1,
            url: '/resources/partner1.svg',
            header: 'Больше клиентов',
            description: 'Помогите клиенту зарегистрироваться у нас, вручив ему свой персональный ключ партнера.'
        },
        {
            id: 2,
            url: '/resources/partner2.svg',
            header: 'Больше процентов',
            description: 'Получайте 25% от всех платежей клиента в течении целого года.'
        },
        {
            id: 3,
            url: '/resources/partner3.svg',
            header: 'Мы договоримся',
            description: 'Просто напишите на эту почту - <a class="link" href="mailto:part@фирмы.онлайн">part@фирмы.онлайн</a>'
        }
    ]
});
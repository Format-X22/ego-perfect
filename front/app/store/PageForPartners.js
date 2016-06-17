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
            url: '/resources/img/partner1.svg',
            header: 'Больше клиентов',
            description: 'Помогите клиенту зарегистрироваться у нас, вручив ему свой персональный ключ партнера.'
        },
        {
            id: 2,
            url: '/resources/img/partner2.svg',
            header: 'Больше процентов',
            description: 
                'Получайте 40% от дохода за каждого клиента и 10% от дохода за каждого партнера. ' +
                'В течении всего года после их регистрации.'
        },
        {
            id: 3,
            url: '/resources/img/partner3.svg',
            header: 'Мы договоримся',
            description:
                'Просто напишите на эту почту - ' +
                '<a class="link" href="mailto:w@фирмы.онлайн">w@фирмы.онлайн</a><br>' +
                'или позвоните на номер<br>' +
                '<a class="link" href="tel:88002500186">8 (800) 25-00-186</a>'
        }
    ]
});
/**
 * Стор страницы для клиентов.
 */
Ext.define('A.store.PageForClients', {
    extend: 'Ext.data.Store',
    singleton: true,
    storeId: 'pageForClients',

    model: 'A.model.InfoPage',

    proxy: {
        type: 'memory'
    },

    data: [
        {
            id: 3,
            url: '/resources/img/client3.svg',
            header: 'Визуальный поиск',
            description:
                'Никакой простыни текста - поиск на основе графического представления'
        },
        {
            id: 5,
            url: '/resources/img/client5.svg',
            header: 'Телефоны и планшеты',
            description:
                'Охват мобильной аудитории для каждой компании'
        },
        {
            id: 6,
            url: '/resources/img/client6.svg',
            header: 'Enterprise',
            description:
                'Промышленные стандарты технологий внутри'
        },
        {
            id: 2,
            url: '/resources/img/client2.svg',
            header: 'Информация важнее',
            description:
                'Информация на первом месте, быстрая адаптация клиентов'
        },
        {
            id: 1,
            url: '/resources/img/client1.svg',
            header: 'Интерактив',
            description:
                'Представление компаний в виде микро-презентаций'
        },
        {
            id: 4,
            url: '/resources/img/client4.svg',
            header: 'Коротко и по делу',
            description:
                'Информация без всего лишнего'
        }
    ]
});
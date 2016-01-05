/**
 * Заполнитель пространства с подсказкой на случай если
 * статистики ещё не откуда взять.
 */
Ext.define('A.view.partner.statistic.EmptyPlaceholder', {
    extend: 'Ext.container.Container',
    xtype: 'partnerStatisticEmptyPlaceholder',

    layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
    },
    items: [
        {
            xtype: 'component',
            html:
                'Статистика будет включена сразу после первой регистрации' +
                ' клиента или партнера по вашему ключу.'
        }
    ]
});
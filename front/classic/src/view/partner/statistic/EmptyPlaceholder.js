/**
 * Заполнитель пространства с подсказкой на случай если
 * статистики ещё не откуда взять.
 */
Ext.define('A.view.partner.statistic.EmptyPlaceholder', {
    extend: 'Ext.container.Container',
    xtype: 'partnerStatisticEmptyPlaceholder',

    padding: 40,
    html:
        'Примерно так может выглядеть ваша статистика.<br>' +
        'Реальная статистика будет включена сразу после первой регистрации<br>' +
        'клиента или партнера по вашему ключу.'
});
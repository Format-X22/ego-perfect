/**
 * Заполнитель пространства с подсказкой на случай если
 * статистики ещё не откуда взять.
 */
Ext.define('A.view.client.statistic.EmptyPlaceholder', {
    extend: 'Ext.Component',
    xtype: 'clientStatisticEmptyPlaceholder',

    padding: 40,
    html:
        'Примерно так может выглядеть ваша статистика.<br>' +
        'Реальная статистика будет сформирована спустя месяц после размещения.'
});
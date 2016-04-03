/**
 * Заполнитель пространства с подсказкой на случай если
 * статистики ещё не откуда взять.
 */
Ext.define('A.view.client.statistic.EmptyPlaceholder', {
    extend: 'Ext.Component',
    xtype: 'clientStatisticEmptyPlaceholder',

    padding: '0 40 20 40',
    html:
        'Примерно так будет выглядеть ваша статистика.<br>' +
        'Реальная статистика будет сформирована сразу после оплаты<br>' +
        'и будет обновляться ежедневно.'
});
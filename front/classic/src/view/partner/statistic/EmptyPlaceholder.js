/**
 * Заполнитель пространства с подсказкой на случай если
 * статистики ещё не откуда взять.
 */
Ext.define('A.view.partner.statistic.EmptyPlaceholder', {
    extend: 'A.view.widget.AdminTopDescription',
    xtype: 'partnerStatisticEmptyPlaceholder',

    padding: '0 40 20 40',
    html:
        'Примерно так может выглядеть ваша статистика.<br>' +
        'Реальная статистика будет сформирована сразу после первого клиента или партнера<br>' +
        'и будет обновляться ежедневно.'
});
/**
 * Заполнитель пространства с подсказкой на случай если
 * статистики ещё не откуда взять.
 */
Ext.define('A.view.client.statistic.EmptyPlaceholder', {
    extend: 'Ext.container.Container',
    xtype: 'clientStatisticEmptyPlaceholder',

    layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
    },
    items: [
        {
            xtype: 'component',
            html:
                'Слишком мало данных для статистики,' +
                ' первые данные будут доступны в первых числах ближайшего месяца.'
        }
    ]
});
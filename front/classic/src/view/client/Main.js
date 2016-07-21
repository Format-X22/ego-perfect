/**
 * Главный виджет части приложения для клиентов для ПК.
 */
Ext.define('A.view.client.Main', {
    extend: 'Ext.form.Panel',
    xtype: 'appMainClient',
    controller: 'clientMain',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.theme.Sky',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Area',
        'Ext.chart.interactions.ItemHighlight',
        'A.view.client.MainController',
        'A.view.client.statistic.Rating',
        'A.view.client.statistic.Views',
        'A.view.client.statistic.Reviews',
        'A.view.client.statistic.Stars',
        'A.view.client.statistic.EmptyPlaceholder',
        'A.view.client.editor.Basic',
        'A.view.client.editor.Summary',
        'A.view.client.editor.Photo',
        'A.view.client.editor.widget.HintSplitLine',
        'A.view.client.Profile',
        'A.view.client.pay.NoCard',
        'A.view.client.TopToolbar',
        'A.view.widget.SaveToolbar',
        'A.view.widget.AdminTopDescription'
    ],

    layout: 'vbox',

    defaults: {
        width: '100%'
    },

    items: [
        {
            name: '_id',
            xtype: 'hidden'
        },
        {
            xtype: 'clientTopToolbar'
        },
        {
            xtype: 'tabpanel',
            flex: 1,
            items: [
                {
                    xtype: 'tabpanel',
                    title: 'Статистика',
                    height: '100%',
                    defaults: {
                        padding: 30
                    },
                    items: [
                        {
                            xtype: 'clientStatisticRating',
                            title: 'Рейтинг'
                        },
                        {
                            xtype: 'clientStatisticViews',
                            title: 'Просмотры'
                        },
                        {
                            xtype: 'clientStatisticReviews',
                            title: 'Отзывы'
                        },
                        {
                            xtype: 'clientStatisticStars',
                            title: 'Звездность'
                        }
                    ]
                },
                {
                    itemId: 'editorTabPanel',
                    xtype: 'tabpanel',
                    title: 'Редактор',
                    listeners: {
                        beforetabchange: 'checkEditorSaveOnTabChange'
                    },
                    items: [
                        {
                            xtype: 'clientEditorBasic',
                            title: 'Основное'
                        },
                        {
                            xtype: 'clientEditorSummary',
                            title: 'Описание компании'
                        },
                        {
                            xtype: 'clientEditorPhoto',
                            title: 'Фото'
                        },
                        {
                            xtype: 'clientEditorKeyWords',
                            title: 'Ключевые слова'
                        }
                    ]
                },
                {
                    xtype: 'clientProfile',
                    title: 'Профиль'
                },
                {
                    xtype: 'clientPayNoCard',
                    title: 'Оплата'
                }
            ]
        }
    ],

    listeners: {
        show: 'loadData'
    }
});
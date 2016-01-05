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
        'A.view.client.Profile',
        'A.view.client.TopToolbar',
        'A.view.widget.SaveToolbar'
    ],

    layout: 'vbox',

    defaults: {
        width: '100%'
    },

    items: [
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
                    iconCls: 'x-fa fa-line-chart',
                    height: '100%',
                    defaults: {
                        padding: 30
                    },
                    items: [
                        {
                            xtype: 'clientStatisticRating',
                            title: 'Рейтинг',
                            iconCls: 'x-fa fa-diamond'
                        },
                        {
                            xtype: 'clientStatisticViews',
                            title: 'Просмотры',
                            iconCls: 'x-fa fa-eye'
                        },
                        {
                            xtype: 'clientStatisticReviews',
                            title: 'Отзывы',
                            iconCls: 'x-fa fa-commenting'
                        },
                        {
                            xtype: 'clientStatisticStars',
                            title: 'Звездность',
                            iconCls: 'x-fa fa-star'
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    title: 'Редактор',
                    iconCls: 'x-fa fa-pencil-square-o',
                    items: [
                        {
                            xtype: 'clientEditorBasic',
                            title: 'Основное',
                            iconCls: 'x-fa fa-list'
                        },
                        {
                            xtype: 'clientEditorSummary',
                            title: 'Описание компании',
                            iconCls: 'x-fa fa-file-text-o'
                        },
                        {
                            xtype: 'clientEditorPhoto',
                            title: 'Фото',
                            iconCls: 'x-fa fa-picture-o'
                        },
                        {
                            xtype: 'clientEditorKeyWords',
                            title: 'Ключевые слова',
                            iconCls: 'x-fa fa-font'
                        }
                    ]
                },
                {
                    xtype: 'clientProfile',
                    title: 'Профиль',
                    iconCls: 'x-fa fa-user'
                },
                {
                    xtype: 'container',
                    title: 'Оплата',
                    iconCls: 'x-fa fa-money'
                }
            ]
        }
    ]
});
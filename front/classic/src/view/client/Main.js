/**
 * Главный виджет части приложения для клиентов для ПК.
 */
Ext.define('A.view.client.Main', {
    extend: 'Ext.container.Container',
    xtype: 'appMainClient',

    requires: [
        'A.view.client.editor.Basic',
        'A.view.client.editor.Summary',
        'A.view.client.editor.Photo',
        'A.view.client.SaveToolbar'
    ],

    layout: 'vbox',
    defaults: {
        width: '100%'
    },

    items: [
        {
            xtype: 'toolbar',
            height: 70,
            items: [
                {
                    itemId: 'toSearch',
                    xtype: 'button',
                    text: 'На страницу поиска',
                    iconCls: 'x-fa fa-search'
                },
                {
                    itemId: 'toDetails',
                    xtype: 'button',
                    text: 'На страницу вашей компании',
                    iconCls: 'x-fa fa-file-text-o'
                },
                {
                    itemId: 'release',
                    xtype: 'button',
                    text: 'Разместить!',
                    iconCls: 'x-fa fa-cloud-upload'
                },
                {
                    xtype: 'button',
                    text: 'Выйти',
                    iconCls: 'x-fa fa-lock'
                },
                {
                    xtype: 'container',
                    flex: 1
                },
                {
                    xtype: 'tbtext',
                    html: 'Панель управления'
                },
                {
                    xtype: 'container',
                    flex: 2
                }
            ]
        },
        {
            xtype: 'tabpanel',
            flex: 1,
            items: [
                {
                    xtype: 'tabpanel',
                    title: 'Статистика',
                    iconCls: 'x-fa fa-line-chart',
                    items: [
                        {
                            xtype: 'container',
                            title: 'Рейтинг',
                            iconCls: 'x-fa fa-diamond'
                        },
                        {
                            xtype: 'container',
                            title: 'Просмотры',
                            iconCls: 'x-fa fa-eye'
                        },
                        {
                            xtype: 'container',
                            title: 'Отзывы',
                            iconCls: 'x-fa fa-commenting'
                        },
                        {
                            xtype: 'container',
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
                        }
                    ]
                },
                {
                    xtype: 'container',
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
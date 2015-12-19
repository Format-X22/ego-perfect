/**
 * Редактор базовой информации.
 */
Ext.define('A.view.client.editor.Basic', {
    extend: 'Ext.form.Panel',
    xtype: 'clientEditorBasic',
    controller: 'clientEditorBasic',

    requires: [
        'A.view.client.editor.BasicController'
    ],

    layout: 'vbox',

    items: [
        {
            xtype: 'clientEditorSaveToolbar'
        },
        {
            xtype: 'container',
            padding: '20 20 20 50',
            flex: 1,
            width: '100%',
            scrollable: 'vertical',
            items: [
                {
                    xtype: 'container',
                    layout: 'vbox',
                    defaults: {
                        width: 600,
                        margin: '7 0'
                    },
                    items: [
                        {
                            name: 'name',
                            xtype: 'textfield',
                            fieldLabel: 'Имя компании',
                            maxLength: 100,
                            allowBlank: false
                        },
                        {
                            name: 'phone',
                            xtype: 'textfield',
                            fieldLabel: 'Телефон',
                            maxLength: 100
                        },
                        {
                            name: 'site',
                            xtype: 'textfield',
                            fieldLabel: 'Сайт',
                            maxLength: 100
                        },
                        {
                            name: 'mail',
                            xtype: 'textfield',
                            fieldLabel: 'Электронная почта',
                            maxLength: 100
                        },
                        {
                            name: 'time',
                            xtype: 'textfield',
                            fieldLabel: 'Время работы',
                            maxLength: 100
                        },
                        {
                            name: 'address',
                            xtype: 'textfield',
                            fieldLabel: 'Адрес',
                            maxLength: 200
                        },
                        {
                            name: 'map',
                            xtype: 'textfield',
                            fieldLabel: 'Координаты на карте',
                            maxLength: 100
                        },
                        {
                            xtype: 'container',
                            height: 50,
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Где получить свои координаты?'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
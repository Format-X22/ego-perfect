/**
 * Редактор базовой информации.
 */
Ext.define('A.view.client.editor.Basic', {
    extend: 'Ext.form.Panel',
    xtype: 'clientEditorBasic',

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
                            fieldLabel: 'Имя компании'
                        },
                        {
                            name: 'phone',
                            xtype: 'textfield',
                            fieldLabel: 'Телефон'
                        },
                        {
                            name: 'site',
                            xtype: 'textfield',
                            fieldLabel: 'Сайт'
                        },
                        {
                            name: 'mail',
                            xtype: 'textfield',
                            fieldLabel: 'Электронная почта'
                        },
                        {
                            name: 'time',
                            xtype: 'textfield',
                            fieldLabel: 'Время работы'
                        },
                        {
                            name: 'address',
                            xtype: 'textfield',
                            fieldLabel: 'Адрес'
                        },
                        {
                            name: 'map',
                            xtype: 'textfield',
                            fieldLabel: 'Координаты на карте'
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
                                    text: 'Где можно получить свои координаты?'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
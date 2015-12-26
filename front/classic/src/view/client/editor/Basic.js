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
                        margin: '7 0',
                        msgTarget: 'under'
                    },
                    items: [
                        {
                            name: 'name',
                            xtype: 'textfield',
                            fieldLabel: 'Имя компании',
                            emptyText: 'ООО Ромашка',
                            maxLength: 100,
                            allowBlank: false
                        },
                        {
                            name: 'phone',
                            xtype: 'textfield',
                            fieldLabel: 'Телефон',
                            emptyText: '+7 (999) 777-99-99, +7 (888) 555-44-22',
                            maxLength: 100
                        },
                        {
                            name: 'site',
                            xtype: 'textfield',
                            fieldLabel: 'Сайт',
                            emptyText: 'http://mysite.com',
                            maxLength: 100
                        },
                        {
                            name: 'mail',
                            xtype: 'textfield',
                            fieldLabel: 'Электронная почта',
                            emptyText: 'boss@mysite.com',
                            maxLength: 100
                        },
                        {
                            name: 'time',
                            xtype: 'textfield',
                            fieldLabel: 'Время работы',
                            emptyText: 'пн-пт: 9-18, сб-вс: 10-14',
                            maxLength: 100
                        },
                        {
                            name: 'address',
                            xtype: 'textfield',
                            fieldLabel: 'Адрес',
                            emptyText: 'Москва, Балаклавский пр., 14А',
                            maxLength: 200
                        },
                        {
                            name: 'map',
                            xtype: 'textfield',
                            fieldLabel: 'Координаты на карте',
                            emptyText: '55.6341123, 37.602898',
                            maxLength: 100,
                            allowBlank: false,
                            validateOnChange: false,
                            validator: function () {
                                return this.up('form').getController().mapValidator.apply(this, arguments);
                            }
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
                                    text: 'Где получить свои координаты?',
                                    ui: 'default-toolbar'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
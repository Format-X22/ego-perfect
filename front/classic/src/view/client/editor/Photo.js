/**
 * Редактор фото.
 */
Ext.define('A.view.client.editor.Photo', {
    extend: 'Ext.form.Panel',
    xtype: 'clientEditorPhoto',
    controller: 'clientEditorPhoto',

    requires: [
        'A.view.client.editor.PhotoController'
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
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        width: 600,
                        msgTarget: 'under',
                        regex: /.(png|jpg|jpeg|svg)$/i,
                        regexText: 'Разрешены только файлы png, jpg, jpeg и svg.'
                    },
                    items: [
                        {
                            name: 'photo1',
                            xtype: 'filefield',
                            fieldLabel: 'Фото №1',
                            allowBlank: false
                        },
                        {
                            name: 'photo2',
                            xtype: 'filefield',
                            fieldLabel: 'Фото №2',
                            allowBlank: false
                        },
                        {
                            name: 'photo3',
                            xtype: 'filefield',
                            fieldLabel: 'Фото №3',
                            allowBlank: false
                        },
                        {
                            name: 'photo4',
                            xtype: 'filefield',
                            fieldLabel: 'Фото №4'
                        },
                        {
                            name: 'photo5',
                            xtype: 'filefield',
                            fieldLabel: 'Фото №5'
                        },
                        {
                            name: 'photo6',
                            xtype: 'filefield',
                            fieldLabel: 'Фото №6'
                        },
                        {
                            name: 'photo7',
                            xtype: 'filefield',
                            fieldLabel: 'Фото №7'
                        },
                        {
                            name: 'photo8',
                            xtype: 'filefield',
                            fieldLabel: 'Фото №8'
                        },
                        {
                            name: 'photo9',
                            xtype: 'filefield',
                            fieldLabel: 'Фото №9'
                        },
                        {
                            name: 'photo10',
                            xtype: 'filefield',
                            fieldLabel: 'Фото №10'
                        }
                    ]
                }
            ]
        }
    ]
});
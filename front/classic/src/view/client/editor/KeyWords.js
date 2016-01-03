/**
 * Редактор ключевых слов.
 */
Ext.define('A.view.client.editor.KeyWords', {
    extend: 'Ext.form.Panel',
    xtype: 'clientEditorKeyWords',
    controller: 'clientEditorKeyWords',

    requires: [
        'A.view.client.editor.PhotoController'
    ],

    layout: 'vbox',

    items: [
        {
            xtype: 'widgetSaveToolbar'
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
                        maskRe: /([A-z]|[А-я]|[0-9]|ё|Ё|-)/i,
                        regex: /^([A-z]|[А-я]|[0-9]|ё|Ё|-)+$/i,
                        regexText: 'Используйте одно слово из букв, цифр и тире',
                        maxLength: 100
                    },
                    items: [
                        {
                            name: 'word1',
                            xtype: 'textfield',
                            fieldLabel: 'Слово №1'
                        },
                        {
                            name: 'word2',
                            xtype: 'textfield',
                            fieldLabel: 'Слово №2'
                        },
                        {
                            name: 'word3',
                            xtype: 'textfield',
                            fieldLabel: 'Слово №3'
                        },
                        {
                            name: 'word4',
                            xtype: 'textfield',
                            fieldLabel: 'Слово №4'
                        },
                        {
                            name: 'word5',
                            xtype: 'textfield',
                            fieldLabel: 'Слово №5'
                        },
                        {
                            name: 'word6',
                            xtype: 'textfield',
                            fieldLabel: 'Слово №6'
                        },
                        {
                            name: 'word7',
                            xtype: 'textfield',
                            fieldLabel: 'Слово №7'
                        },
                        {
                            name: 'word8',
                            xtype: 'textfield',
                            fieldLabel: 'Слово №8'
                        },
                        {
                            name: 'word9',
                            xtype: 'textfield',
                            fieldLabel: 'Слово №9'
                        },
                        {
                            name: 'word10',
                            xtype: 'textfield',
                            fieldLabel: 'Слово №10'
                        }
                    ]
                }
            ]
        }
    ]
});
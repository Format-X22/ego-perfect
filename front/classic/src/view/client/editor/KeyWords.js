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

    listeners: {
        dirtychange: 'toggleSaveToolbar'
    },
    
    items: [
        {
            xtype: 'widgetSaveToolbar'
        },
		{
			xtype: 'adminTopDescription',
			border: '0 0 1 0',
			html:
				'Именно по этим словам и фразам вас и сможет найти клиент.<br>' +
				'Укажите то, что максимально характеризует именно ваш род деятельности и то,<br>' +
				'какие услуги или товары вы можете предоставить.<br>' +
				'При необходимости укажите город.'
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
						margin: '4 0',
                        width: 600,
                        maxLength: 100,
                        msgTarget: 'under',
                        validator: function (value) {
                            if (!value) {
                                return true;
                            }
                            
                            value = value
                                .trim()
                                .replace(/ - /g,  ' ')
                                .replace( /- /g,  ' ')
                                .replace( / -/g,  ' ')
                                .replace(  /-/g,  ' ')
                                .replace(/[ ]+/g, ' ');

                            if (value.split(' ').length > 3) {
                                return 'Слишком много для одного слова...';
                            }

                            return true;
                        }
                    },
                    items: [
                        {
                            name: 'word1',
                            xtype: 'textfield',
                            fieldLabel: 'Слово №1',
                            value: 'Москва'
                        },
                        {
                            name: 'word2',
                            xtype: 'textfield',
                            fieldLabel: 'Слово №2',
                            value: 'двери'
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
/**
 * Редактор описания компании.
 */
Ext.define('A.view.client.editor.Summary', {
    extend: 'Ext.form.Panel',
    xtype: 'clientEditorSummary',
    controller: 'clientEditorSummary',

    requires: [
        'A.view.client.editor.SummaryController'
    ],

    items: [
        {
            xtype: 'widgetSaveToolbar'
        },
		{
			xtype: 'adminTopDescription',
			border: '0 0 1 0',
			html:
				'Опишите вашу компанию. Подробно.<br>' +
				'Расскажите о том чем вы занимаетесь и что можете предложить.<br>' +
				'Особенно хорошо если клиент, прочитав первые предложения,<br>' +
				'сразу поймет что он может получить и на что рассчитывать.<br>' +
				'На основе этого текста будет сформировано первое впечатление<br>' +
				'о вас и вашей компании.'
		},
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    name: 'summary',
                    xtype: 'htmleditor',
                    padding: '20 0 0 0',
                    width: 600,
                    height: 340,
                    resizable: {
                        handles: 'w e s se sw'
                    },
                    enableColors: false,
                    enableFont: false,
                    enableFontSize: false,
                    enableSourceEdit: false,
                    enableLinks: false,
                    value: 'А мы самые <b>лучшие!</b>'
                }
            ]
        }
    ]
});
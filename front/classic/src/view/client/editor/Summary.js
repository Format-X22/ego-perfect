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
            xtype: 'clientEditorSaveToolbar'
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
                    height: 350,
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
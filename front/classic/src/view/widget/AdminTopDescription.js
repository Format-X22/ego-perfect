/**
 * Подсказка над каким-либо элементом интерфейса в админке.
 * Например - поясняющий текст над графиком.
 * Необходимо указать конфиг html.
 */
Ext.define('A.view.widget.AdminTopDescription', {
    extend: 'Ext.panel.Panel',
    xtype: 'adminTopDescription',

    width: '100%',
    padding: '20 40 20 40',
    minHeight: 16,
    border: false,
    bodyBorder: false,

    dockedItems: [
        {
            dock: 'left',
            xtype: 'toolbar',
            padding: '0 5',
            items: [
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-close',
                    tooltip: 'Спрятать подсказку',
                    border: 0,
                    padding: 0,
                    style: 'background-color: white',
                    handler: function () {
                        var panel = this.up('panel');
                        
                        panel.hide();
                        panel.destroy();
                    }
                }
            ]
        }
    ]
});
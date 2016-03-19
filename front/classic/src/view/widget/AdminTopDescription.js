/**
 * Подсказка над каким-либо элементом интерфейса в админке.
 * Например - поясняющий текст над графиком.
 * Необходимо указать конфиг html.
 */
Ext.define('A.view.widget.AdminTopDescription', {
	extend: 'Ext.Component',
	xtype: 'adminTopDescription',

	width: '100%',
	padding: '20 40 20 40',
	border: 0,
	style: {
		borderColor: '#d0d0d0',
		borderStyle: 'solid'
	}
});
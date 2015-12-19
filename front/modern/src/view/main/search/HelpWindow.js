/**
 * Окно, выводящее подсказку о том что нужно нажимать на
 * квадраты для получения подробной инфорамации.
 */
Ext.define('A.view.main.search.HelpWindow', {
    extend: 'Ext.MessageBox',
    xtype: 'searchHelpWindow',
    controller: 'searchHelpWindow',

    requires: [
        'A.view.main.search.HelpWindowController'
    ],

    width: 300,
    height: 380,

    title: 'Подсказка',
    buttons: Ext.MessageBox.OK,

    layout: {
        type: 'vbox',
        align: 'center'
    },

    items: [
        {
            flex: 1
        },
        {
            xtype: 'img',
            width: 180,
            height: 180,
            src: '/resources/img/help.svg'
        },
        {
            flex: 1
        },
        {
            xtype: 'component',
            html: 'Нажмайте на любой квадрат для получения информации о компании.'
        }
    ],

    /**
     * Показывает окно если окно никогда
     * не было показано до этого.
     */
    tryShow: function () {
        this.getController().modernShow();
    }
});
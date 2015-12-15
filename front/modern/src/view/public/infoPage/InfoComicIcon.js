/**
 * Иконка с заголовком и информацией как итем для страницы информации.
 */
Ext.define('A.view.public.infoPage.InfoComicIcon', {
    extend: 'Ext.dataview.component.DataItem',
    xtype: 'infoComicIcon',

    cls: 'info-comic-icon',

    width: 210,
    margin: 30,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'top'
    },

    items: [
        {
            itemId: 'img',
            xtype: 'img',
            width: 180,
            height: 180
        },
        {
            itemId: 'header',
            xtype: 'component',
            padding: 15,
            cls: 'header'
        },
        {
            itemId: 'description',
            xtype: 'component'
        }
    ],

    /**
     * @inheritdoc
     */
    updateRecord: function (record) {
        this.down('#img').setSrc(record.get('url'));
        this.down('#header').setHtml(record.get('header'));
        this.down('#description').setHtml(record.get('description'));
    }
});

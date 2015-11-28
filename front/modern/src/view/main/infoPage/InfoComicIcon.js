/**
 *
 */
Ext.define('A.view.main.infoPage.InfoComicIcon', {
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
            height: 180,
            src: 'http://img2.wikia.nocookie.net/__cb20130207074041/adventuretime/ru/images/5/55/180x180_profile_adventuretime_jake_01.jpg'
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

    updateRecord: function (record) {
        //this.down('#img').setSrc();
        this.down('#header').setHtml(record.get('header'));
        this.down('#description').setHtml(record.get('description'));
    }
});

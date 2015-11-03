Ext.define('A.view.main.infoPage.InfoComicIcon', {
    extend: 'Ext.dataview.component.DataItem',
    xtype: 'infoComicIcon',

    width: 200,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'top'
    },

    items: [
        {
            xtype: 'img',
            width: 180,
            height: 180,
            src: 'http://img2.wikia.nocookie.net/__cb20130207074041/adventuretime/ru/images/5/55/180x180_profile_adventuretime_jake_01.jpg'
        },
        {
            xtype: 'component',
            html: 'Заголовок'
        },
        {
            xtype: 'component',
            html: 'Описание чего-то<br>в целых три вот таких<br>строки разнообразного текста.'
        }
    ],

    updateRecord: function (record) {
        //
    }
});

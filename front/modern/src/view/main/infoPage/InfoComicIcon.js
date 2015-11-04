/**
 * Информационная иконка с заголовком и описанием.
 * Служит для предоставления информации в датавью информационных страниц.
 */
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
            html: 'Описание чего-то<br>в целых три-четыре вот таких<br>строки разнообразного текста.'
        }
    ],

    /**
     * Наполняем виджет данными.
     * @param {Ext.data.Model} record Рекорд с данными.
     */
    updateRecord: function (record) {
        //
    }
});

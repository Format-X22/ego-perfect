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
            height: 180
        },
        {
            itemId: 'header',
            xtype: 'component'
        },
        {
            itemId: 'description',
            xtype: 'component'
        }
    ],

    /**
     * Наполняем виджет данными.
     * @param {Ext.data.Model} record Рекорд с данными.
     */
    updateRecord: function (record) {
        //var img = '/comicon' + record.get('id');
        var img = 'http://img2.wikia.nocookie.net/__cb20130207074041/adventuretime/ru/images/5/55/180x180_profile_adventuretime_jake_01.jpg';

        this.down('img').setSrc(img);
        this.down('#header').setHtml(record.get('header'));
        this.down('#description').setHtml(record.get('description'));
    }
});

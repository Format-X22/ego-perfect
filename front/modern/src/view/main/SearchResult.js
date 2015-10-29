Ext.define('A.view.main.SearchResult', {
    extend: 'Ext.dataview.component.DataItem',
    xtype: 'companySearchResult',

    width: 320,
    margin: '12 6',

    items: [
        {
            xtype: 'img',
            width: 300,
            height: 300,
            src: 'http://www.newlifefamilychiropractic.net/wp-content/uploads/2014/07/300x300.gif'
        }
    ],

    updateRecord: function (record) {
        //
    }
});
/**
 * Итем результата поиска.
 */
Ext.define('A.view.main.search.SearchResultItem', {
    extend: 'Ext.dataview.component.DataItem',
    xtype: 'searchResultItem',

    requires: [
        'Ext.plugin.Responsive'
    ],

    width: 320,

    items: [
        {
            xtype: 'img',
            width: 300,
            height: 300,
            plugins: 'responsive',
            responsiveConfig: {
                'width < 680': {
                    margin: '12 0'
                },
                'width >= 680': {
                    margin: '12 20'
                }
            }
        }
    ],

    updateRecord: function (record) {
        //var link = '/logo' + record.get('id');
        var link = 'http://www.wilsoninfo.com/300x300.gif';

        this.down('img').setSrc(link);
    }
});
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

    /**
     * @inheritdoc
     */
    updateRecord: function (record) {
        if (!record) {
            return;
        }
        
        var linkTpl = 
            'http://res.cloudinary.com/hycanb7c0/image/upload/q_75,c_pad,w_300,h_300/{0}.jpg';
        var link = Ext.String.format(linkTpl, record.get('company'));

        this.down('img').setSrc(link);
    }
});
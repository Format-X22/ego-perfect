Ext.define('A.view.main.SearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.search',

    mobileSearch: function () {
        var view = this.getView();
        var initWidget = view.down('#mobileInitSearch');
        var initInput = initWidget.down('textfield');
        var searchWidget = view.down('#mobileSearch');
        var searchInput = searchWidget.down('textfield');
        var searchResult = view.down('dataview');

        searchInput.setValue(initInput.getValue());

        initWidget.hide();
        initWidget.isInitState = false;
        searchWidget.show();
        searchResult.show();
    }
});

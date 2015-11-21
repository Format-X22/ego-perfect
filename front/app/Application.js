/**
 * Стартовый класс приложения.
 */
Ext.define('A.Application', {
    extend: 'Ext.app.Application',
    
    name: 'A',
    
    launch: function () {
        Ext.Loader.loadScript({
            url: 'http://maps.google.com/maps/api/js'
        });
    }
});

/**
 * Стартовый класс приложения.
 */
Ext.define('A.Application', {
    extend: 'Ext.app.Application',
    
    name: 'A',
    
    launch: function () {
        Ext.Loader.loadScript({
            url: '//maps.google.com/maps/api/js'
        });
    }
});

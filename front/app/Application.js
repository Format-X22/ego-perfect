/**
 * Стартовый класс приложения.
 */
Ext.define('A.Application', {
    extend: 'Ext.app.Application',
    
    name: 'A',

    controllers: [
        'Router'
    ],

    launch: function () {
        Ext.get('start-preloader').destroy();
        Ext.Loader.loadScript({
            url: '//maps.google.com/maps/api/js'
        });
    }
});

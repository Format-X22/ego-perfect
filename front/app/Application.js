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
        Ext.Loader.loadScript({
            url: '/resources/gallery/photoswipe.js'
        });

        A.getCmp = this.getCmp;
        A.getAllCmp = this.getAllCmp;

        Ext.override(Ext.panel.Panel, {
            closeToolText: 'Закрыть'
        });
    },

    /**
     * Возвращает компонент по указанному селектору, либо null.
     * Также этот метод доступен по короткой ссылке A.getCmp.
     * @param {String} selector Селектор.
     * @return {Ext.Component/Null} Компонент либо null.
     */
    getCmp: function (selector) {
        return this.getAllCmp(selector)[0];
    },

    /**
     * Возвращает массив компонентов по указанному селектору, либо null.
     * Также этот метод доступен по короткой ссылке A.getAllCmp.
     * @param {String} selector Селектор.
     * @return {Ext.Component[]/Null} Массив компонентов либо null.
     */
    getAllCmp: function (selector) {
        return Ext.ComponentQuery.query(selector);
    }
});

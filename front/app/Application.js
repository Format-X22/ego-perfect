/**
 * Стартовый класс приложения.
 */
Ext.define('A.Application', {
    extend: 'Ext.app.Application',

    name: 'A',

    requires: [
        'A.store.reader.Standard',
        'A.controller.Router'
    ],

    launch: function () {
        Ext.get('start-preloader').destroy();
        Ext.Loader.loadScript({
            url: '//maps.google.com/maps/api/js?key=AIzaSyBEPQR_7mteAqe414VJ4E8MUWN6ffqaoMQ'
        });

        A.getCmp = this.getCmp;
        A.getAllCmp = this.getAllCmp;

        Ext.override(Ext.panel.Panel, {
            closeToolText: 'Закрыть'
        });

        A.Router = A.controller.Router;
        A.Router.goToCurrentPage();
        
        A.adminReg = this.adminReg;
        
        this.initGeo();
    },

    /**
     * Возвращает компонент по указанному селектору, либо null.
     * Также этот метод доступен по короткой ссылке A.getCmp.
     * @param {String} selector Селектор.
     * @param {Ext.Component} [root] Корневой виджет.
     * @return {Ext.Component/Null} Компонент либо null.
     */
    getCmp: function (selector, root) {
        return this.getAllCmp(selector, root)[0];
    },

    /**
     * Возвращает массив компонентов по указанному селектору, либо null.
     * Также этот метод доступен по короткой ссылке A.getAllCmp.
     * @param {String} selector Селектор.
     * @param {Ext.Component} [root] Корневой виджет.
     * @return {Ext.Component[]/Null} Массив компонентов либо null.
     */
    getAllCmp: function (selector, root) {
        if (root) {
            return Ext.ComponentQuery.query(selector, root);
        } else {
            return Ext.ComponentQuery.query(selector);
        }
    },

    /**
     * Отображение всех настроек регистрации.
     */
    adminReg: function () {
        A.getCmp('#registerSwitch').show();
    },

    /**
     * Получение геопозиции пользователя.
     */
    initGeo: function () {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var coords = position.coords;

                if (Ext.isClassic) {
                    Ext.util.Cookies.set('lat', position.coords.latitude);
                    Ext.util.Cookies.set('lng', position.coords.longitude);
                } else {
                    document.cookie += '; lat=' + coords.latitude + '; lng=' + coords.longitude;
                }
            }.bind(this));
        }
    }
});
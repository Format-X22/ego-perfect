/**
 * Главный виджет сайта для мобильников и планшетов.
 */
Ext.define('A.view.main.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Responsive',
        'A.view.main.MobileMenuToolbar',
        'A.view.main.MobileMenu',
        'A.view.main.MainTabPanel'
    ],

    layout: 'vbox',

    items: [
        {
            xtype: 'mobileMenuToolbar',
            plugins: 'responsive',
            responsiveConfig: {
                'width < 600 || height < 400': {
                    hidden: false
                },
                'width >= 600 && height >= 400': {
                    hidden: true
                }
            }
        },
        {
            xtype: 'mainTabPanel',
            plugins: 'responsive',
            responsiveConfig: {
                'width < 600 || height < 400': {
                    tabBar: {
                        hidden: true
                    }
                },
                'width >= 600 && height >= 400': {
                    tabBar: {
                        hidden: false
                    }
                }
            }
        }
    ],

    /**
     * @inheritdoc
     * @localdoc
     * Добавляем выдвигающееся меню для телефонов.
     */
    initialize: function () {
        var mobileMenu = Ext.create('A.view.main.MobileMenu');
        var menuConfig = {
            side: 'right'
        };

        Ext.Viewport.setMenu(mobileMenu, menuConfig);

    },

    /**
     * @protected
     * Переопределяем оригинальный элемент формы, добавляя в него признаки,
     * указывающие на то что это поисковая форма, что дает нам отображение
     * кнопки "найти" на клавиатурах устройств в полях поиска.
     * @return {Object} Конфиг элемента.
     */
    getElementConfig: function() {
        var config = this.callParent(arguments);

        config.role = 'search';
        config.action = 'javascript:void(0)';

        return config;
    }
});

/**
 * Вкладка описания в деталях компании, для мобильников.
 */
Ext.define('A.view.main.company.mobile.Summary', {
    extend: 'Ext.Container',
    xtype: 'companySummaryMobile',

    cls: 'company-summary company-summary-mobile',
    layout: 'vbox',
    scrollable: 'vertical',

    items: [
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'component',
                    padding: '18 0 15 0',
                    plugins: 'responsive',
                    responsiveConfig: {
                        width: {
                            maxWidth: {
                                toString: function () {
                                    return Ext.Viewport.getWindowWidth();
                                }
                            }
                        }
                    },
                    bind: {
                        html: '{name}'
                    }
                }
            ]
        },
        {
            xtype: 'component',
            cls: 'separator-horizontal',
            margin: '5 0'
        },
        {
            xtype: 'component',
            padding: '15 10',
            plugins: 'responsive',
            responsiveConfig: {
                width: {
                    width: {
                        toString: function () {
                            return Ext.Viewport.getWindowWidth();
                        }
                    }
                }
            },
            bind: {
                html:
                    '<div class="property"><div class="title">Рейтинг</div> <div class="value">{formatRating}</div></div>' +
                    '<div class="property"><div class="title">Телефон</div> <div class="value">{phone}</div></div>' +
                    '<div class="property"><div class="title">Сайт</div> <div class="value">{site}</div></div>' +
                    '<div class="property"><div class="title">Почта</div> <div class="value">{email}</div></div>' +
                    '<div class="property"><div class="title">Время работы</div> <div class="value">{time}</div></div>' +
                    '<div class="property"><div class="title">Адрес</div> <div class="value">{address}</div></div>'
            }
        },
        {
            xtype: 'component',
            cls: 'separator-horizontal',
            margin: '5 0'
        },
        {
            xtype: 'component',
            padding: 15,
            plugins: 'responsive',
            responsiveConfig: {
                width: {
                    width: {
                        toString: function () {
                            return Ext.Viewport.getWindowWidth();
                        }
                    }
                }
            },
            bind: {
                html: '{summary}'
            }
        },
        {
            xtype: 'component',
            cls: 'separator-horizontal',
            margin: '5 0 35 0'
        },
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'img',
                    width: 300,
                    height: 300,
                    bind: {
                        src: 
                            'http://res.cloudinary.com/hycanb7c0/image/upload/w_300,h_300/{_id}.png'
                    }
                }
            ]
        },
        {
            xtype: 'component',
            height: 15,
            border: 0
        }
    ],

    listeners: {
        painted: function () {
            this.component.getScrollable().scrollTo(0, 0);
        }
    }
});
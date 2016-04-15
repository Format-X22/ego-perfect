/**
 * Вкладка описания в деталях компании.
 */
Ext.define('A.view.main.company.Summary', {
    extend: 'Ext.Container',
    xtype: 'companySummary',

    cls: 'company-summary',
    layout: 'hbox',
    scrollable: 'vertical',
    padding: 15,

    items: [
        {
            xtype: 'container',
            width: 330,
            items: [
                {
                    xtype: 'image',
                    width: 300,
                    height: 300,
                    bind: {
                        src: 'http://res.cloudinary.com/hycanb7c0/image/upload/{_id}.jpg'
                    }
                },
                {
                    xtype: 'component',
                    padding: '15 0',
                    bind: {
                        html:
                            '<div class="property"><div class="title">Рейтинг</div> <div class="value">{formatRating}</div></div>' +
                            '<div class="property"><div class="title">Телефон</div> <div class="value">{phone}</div></div>' +
                            '<div class="property"><div class="title">Сайт</div> <div class="value">{formatSite}</div></div>' +
                            '<div class="property"><div class="title">Почта</div> <div class="value">{email}</div></div>' +
                            '<div class="property"><div class="title">Время работы</div> <div class="value">{time}</div></div>' +
                            '<div class="property"><div class="title">Адрес</div> <div class="value">{address}</div></div>'
                    }
                }
            ]
        },
        {
            xtype: 'component',
            cls: 'separator-vertical',
            flex: 1,
            bind: {
                html: '{summary}'
            },
            plugins: 'responsive',
            responsiveConfig: {
                'width < 1500': {
                    padding: '0 15 25 25',
                    margin: '0 0 0 31'
                },
                'width >= 1500': {
                    padding: '30 100 50 50',
                    margin: '0 0 0 62'
                }
            }
        }
    ]
});
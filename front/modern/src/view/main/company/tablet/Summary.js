Ext.define('A.view.main.company.tablet.Summary', {
    extend: 'Ext.Container',
    xtype: 'companySummaryTablet',

    cls: 'company-summary-tablet',
    layout: 'hbox',
    scrollable: 'vertical',
    padding: 15,

    items: [
        {
            xtype: 'container',
            width: 330,
            items: [
                {
                    xtype: 'img',
                    width: 300,
                    height: 300,
                    src: 'http://www.wilsoninfo.com/300x300.gif'
                },
                {
                    xtype: 'component',
                    padding: '15 0',
                    bind: {
                        html:
                            '<div class="property"><div class="title">Рейтинг</div> <div class="value">{rating}</div></div>' +
                            '<div class="property"><div class="title">Телефон</div> <div class="value">{phone}</div></div>' +
                            '<div class="property"><div class="title">Сайт</div> <div class="value">{site}</div></div>' +
                            '<div class="property"><div class="title">Почта</div> <div class="value">{mail}</div></div>' +
                            '<div class="property"><div class="title">Время работы</div> <div class="value">{time}</div></div>' +
                            '<div class="property"><div class="title">Адрес</div> <div class="value">{address}</div></div>'
                    }
                },
                /*{
                 xtype: 'container',
                 layout: {
                 type: 'hbox',
                 align: 'center',
                 pack: 'center'
                 },
                 items: [
                 /*{
                 xtype: 'button',
                 bind: {
                 iconCls: 'x-fa fa-{socialIconN1}',
                 href: '{socialHrefN1}'
                 }
                 },
                 {
                 xtype: 'button',
                 bind: {
                 iconCls: 'x-fa fa-{socialIconN2}',
                 href: '{socialHrefN2}'
                 }
                 },
                 {
                 xtype: 'button',
                 bind: {
                 iconCls: 'x-fa fa-{socialIconN3}',
                 href: '{socialHrefN3}'
                 }
                 },
                 {
                 xtype: 'button',
                 bind: {
                 iconCls: 'x-fa fa-{socialIconN4}',
                 href: '{socialHrefN4}'
                 }
                 }*/
                //    ]
                //}
            ]
        },
        {
            xtype: 'component',
            cls: 'summary',
            flex: 1,
            padding: '0 5 20 20',
            bind: {
                html: '{summary}'
            }
        }
    ]
});
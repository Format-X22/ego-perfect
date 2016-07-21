/**
 * Контейнер деталей компании.
 */
Ext.define('A.view.main.company.Container', {
    extend: 'Ext.panel.Panel',
    xtype: 'companyContainer',
    controller: 'companyContainer',
    viewModel: 'companyContainer',

    requires: [
        'A.view.main.company.Controller',
        'A.view.main.company.Summary',
        'A.view.main.company.Gallery',
        'A.view.main.company.reviews.Container',
        'A.view.main.company.Map'
    ],

    cls: 'vcard',
    layout: 'fit',

    tbar: [
        {
            itemId: 'backToSearch',
            xtype: 'button',
            text: 'Назад',
            iconCls: 'x-fa fa-chevron-left'
        },
        {
            itemId: 'backToAdmin',
            xtype: 'button',
            text: 'Назад в панель редактирования',
            iconCls: 'x-fa fa-chevron-left',
            hidden: true
        },
        {
            itemId: 'backToSearchFromAdmin',
            xtype: 'button',
            text: 'На страницу поиска',
            iconCls: 'x-fa fa-search',
            hidden: true
        },
        '->',
        {
            xtype: 'tbtext',
            bind: {
                html: '<b class="fn org">{name}</b>'
            }
        },
        '->'
    ],

    items: [
        {
            companyDetailsTabPanel: true,
            xtype: 'tabpanel',
            tabBarPosition: 'top',
            flex: 1,
            items: [
                {
                    itemId: 'summary',
                    xtype: 'companySummary',
                    title: 'Описание'
                },
                {
                    itemId: 'gallery',
                    xtype: 'companyGallery',
                    title: 'Фотографии'
                },
                {
                    itemId: 'reviews',
                    xtype: 'companyReviewsContainer',
                    title: 'Отзывы'
                },
                {
                    itemId: 'map',
                    xtype: 'companyMap',
                    title: 'На карте'
                }
            ]
        }
    ],

    /**
     * Оповещает о том что данные компании загружены.
     */
    notifyCompanyLoad: function () {

        /**
         * @event companyLoaded
         * Происходит после загрузки и добавления в вью-модель данных компании.
         * @param {A.view.main.company.Container} this Этот контейнер.
         */
        this.fireEvent('companyLoaded', this);
    }
});
/**
 * Оповещает клиента о новом отзыве.
 * Необходимо указать {@link #companyId} и {@link #to}.
 */
Ext.define('B.mail.NewReview', {
    extend: 'B.mail.AbstractMail',

    subject: 'Новый отзыв!',
    tpl:
        'Здравствуйте!' +
        '<br><br>' +
        'О вашей компании оставлен новый отзыв!' +
        '<br><br>' +
        'Прочитать его вы можете ' +
        '<a href="http://firms-online.com/page-company-{companyId}_reviews">' +
            'на странице вашей компании.' +
        '</a>' +
        '<br><br>',

    config: {

        /**
         * @cfg {String} companyId (required) ID компании.
         */
        companyId: ''
    },

    init: function () {
        this.callParent(arguments);

        this.setData({
            companyId: this.getCompanyId()
        });
    }
});
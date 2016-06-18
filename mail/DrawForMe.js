/**
 * Отправляет письмо с запросом на отрисовку бесплатного логотипа.
 * Необходимо указать {@link #companyId}.
 */
Ext.define('B.mail.DrawForMe', {
    extend: 'B.mail.AbstractMail',

    to: 'oleg.pav.m@gmail.com',
    subject: 'Запрос на бесплатный логотип',
    tpl: 'ID: {companyId}',

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
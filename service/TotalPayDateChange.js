/**
 * Сервис для всеобщей смены даты оплаты компании на указанную.
 */
Ext.define('B.service.TotalPayDateChange', {
    extend: 'B.service.AbstractService',

    serviceNameForLogger: 'Смена даты оплаты для всех',

    config: {

        /**
         * @cfg {Date} date Дата, на которую стоит изменить текущую дату оплаты.
         */
        date: null
    },

    constructor: function () {
        this.callParent(arguments);

        B.Mongo.getCollection('company').update(
            {},
            {
                $set: {
                    payDate: this.getDate()
                }
            },
            {
                multi: true
            },
            function (error) {
                if (error) {
                    this.logError('Ошибка поиска');
                }
            }.bind(this)
        );
    }
});
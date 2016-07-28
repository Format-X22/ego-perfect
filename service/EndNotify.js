/**
 * Сервис для оповещений о том что скоро конец оплаченного периода.
 */
Ext.define('B.service.EndNotify', {
    extend: 'B.service.WeekReport',

    serviceNameForLogger: 'Оповещение о том что скоро конец оплаченного периода',

    /**
     * @inheritdoc
     */
    sendMailToClient: function (login, data) {
        //
    }
});
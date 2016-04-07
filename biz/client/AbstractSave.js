/**
 * Абстрактная логика сохранения данных клиента.
 */
Ext.define('B.biz.client.AbstractSave', {
	extend: 'B.AbstractRequestHandler',

	requires: [
		'B.biz.auth.util.Account'
	],

	config: {

		/**
		 * @cfg {String} accountId Айди аккаунта.
		 */
		accountId: null,

        /**
         * @cfg {Boolean} releaseRequired Необходимо ли делать релиз данных компании.
         */
        releaseRequired: false
	},

	constructor: function () {
		this.callParent(arguments);

		B.util.Function.queue([
			this.checkAccountStep,
			this.updateDataStep,
            this.releaseIfNeedStep,
			this.sendSuccess
		], this);
	},

	/**
	 * Отправляет сообщение об ошибке базы данных.
	 */
	sendDbError: function () {
		this.sendError('Ошибка записи данных в базу!');
	},

	/**
	 * @protected
	 * Проверка наличия аккаунта по указанной сессии.
	 * @param {Function} next Следующий шаг.
	 */
	checkAccountStep: function (next) {
		var key = this.getRequestModel().get('key');

		Ext.create('B.biz.auth.util.Account', {
			key: key,
			scope: this,
			callback: function (acc) {
				var data = acc.getPrivateAccountData();

				if (data) {
					this.setAccountId(data._id);
					next();
				} else {
					this.sendError('Данные указанного аккаунта не найдены!');
				}
			}
		});
	},

	/**
	 * @protected
	 * Обновление данных аккаунта.
	 * @param {Function} next Следующий шаг.
	 */
	updateDataStep: function (next) {
		var id = B.Mongo.makeId(this.getAccountId());

		B.Mongo
			.getCollection('company')
			.findOneAndUpdate(
				{
					_id: id
				},
				{
					$set: this.getUpdateData()
				},
				function (error) {
					if (error) {
						this.sendDbError();
					} else {
						next();
					}
				}.bind(this)
			);
	},

    /**
     * @protected
     * Запускает релиз данных компании если нужно.
     * Нужность определяется флагом {@link #releaseRequired}.
     * *Прерывает очередь выполнения шагов!*
     * @param {Function} next Следующий шаг.
     */
    releaseIfNeedStep: function (next) {
        if (this.getReleaseRequired()) {
            Ext.create('B.biz.client.Release', {
                expressRequest: this.getExpressRequest(),
                expressResponse: this.getExpressResponse(),
                requestModel: this.getRequestModel()
            });
        } else {
            next();
        }
    },

	/**
	 * @protected
	 * @template
	 * @method getUpdateData
	 * Возврадает набор данных для обновления,
	 * который будет записан поверх существующих данных.
	 * @return {Object} Набор обновленных данных.
	 */
	getUpdateData: Ext.emptyFn
});
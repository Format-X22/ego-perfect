/**
 * Логика смены пароля.
 */
Ext.define('B.biz.auth.ChangePass', {
    extend: 'B.biz.auth.AbstractPassModify',

	/**
	 * @inheritdoc
	 */
	checkAccountExistStep: function (next) {
		var model = this.getRequestModel();

		Ext.create('B.biz.auth.util.Account', {
			key: model.get('key'),
			scope: this,
			callback: function (acc) {
				var accData = acc.getFullAccountData();

				this.setAccount(accData);

				if (accData) {
					next();
				} else {
					this.sendError('Такого аккаунта не существует!');
				}
			}
		});
	}
});
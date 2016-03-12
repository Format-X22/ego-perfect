/**
 * Логика смены пароля.
 */
Ext.define('B.biz.auth.ChangePass', {
    extend: 'B.biz.auth.AbstractPassModify',

	requires: [
		'B.Mail',
		'B.biz.auth.util.Account',
		'B.biz.auth.util.Crypt',
		'B.biz.auth.util.Session'
	],

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
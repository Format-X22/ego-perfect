/**
 * Логика сохранения саммори клиента.
 */
Ext.define('B.biz.client.Summary', {
	extend: 'B.biz.client.AbstractSave',

	/**
	 * @inheritdoc
	 */
	getUpdateData: function () {
		return {
			summary: this.getRequestModel().get('summary')
		};
	}
});
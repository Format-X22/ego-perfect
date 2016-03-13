/**
 * Логика сохранения ключевых слов клиента.
 */
Ext.define('B.biz.client.Words', {
	extend: 'B.biz.client.AbstractSave',

	/**
	 * @inheritdoc
	 */
	getUpdateData: function () {
		var model = this.getRequestModel();

		return {
			word1:  model.get('word1'),
			word2:  model.get('word2'),
			word3:  model.get('word3'),
			word4:  model.get('word4'),
			word5:  model.get('word5'),
			word6:  model.get('word6'),
			word7:  model.get('word7'),
			word8:  model.get('word8'),
			word9:  model.get('word9'),
			word10: model.get('word10')
		};
	}
});
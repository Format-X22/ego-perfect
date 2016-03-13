/**
 * Логика сохранения базовых данных клиента.
 */
Ext.define('B.biz.client.BasicData', {
	extend: 'B.biz.client.AbstractSave',

	/**
	 * @inheritdoc
	 */
	getUpdateData: function () {
		var model = this.getRequestModel();
		var mapArray = model.get('map').split(', ');
		var lat = mapArray[0];
		var lng = mapArray[1];

		return {
			name:    model.get('name'),
			phone:   model.get('phone'),
			site:    model.get('site'),
			email:   model.get('email'),
			time:    model.get('time'),
			address: model.get('address'),
			map: {
				lat: lat,
				lng: lng
			}
		};
	}
});
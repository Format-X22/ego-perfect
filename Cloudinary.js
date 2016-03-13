/**
 * Обертка над драйвером облака Cloudinary.
 */
Ext.define('B.Cloudinary', {
	singleton: true,

	config: {

		/**
		 * @private
		 * @cfg {Object} cloudinaryUtil Драйвер облака.
		 */
		cloudinaryUtil: require('cloudinary')
	},

	constructor: function (config) {
		Ext.apply(this.config, config);
		this.initConfig(this.config);

		this.getCloudinaryUtil().config({
			cloud_name: 'hdfwhiiko',
			api_key: '888691939378469',
			api_secret: '7bJ6HEtZ8DjDrFVgL0-HtAlXamw'
		});
	}
});
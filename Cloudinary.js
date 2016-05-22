/**
 * Обертка над драйвером облака Cloudinary.
 */
Ext.define('B.Cloudinary', {
	singleton: true,

	config: {

		/**
		 * @cfg {Object} cloudinaryUtil Драйвер облака.
		 */
		cloudinaryUtil: require('cloudinary')
	},

	constructor: function (config) {
		this.initConfig(config);

		this.getCloudinaryUtil().config(outerResourcesConfig.cloudinary);
	}
});
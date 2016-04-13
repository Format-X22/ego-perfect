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
		Ext.apply(this.config, config);
		this.initConfig(this.config);

		this.getCloudinaryUtil().config(outerResourcesConfig.cloudinary);
	}
});
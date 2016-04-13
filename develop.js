global.outerResourcesConfig = {};

outerResourcesConfig.cloudinary = {
    cloud_name: 'hdfwhiiko',
    api_key: '888691939378469',
    api_secret: '7bJ6HEtZ8DjDrFVgL0-HtAlXamw'
};

outerResourcesConfig.mongo = {
    dataBaseLink: 'mongodb://admin:114430fK@ds031551.mongolab.com:31551/heroku_hfxkwqsw'
};

outerResourcesConfig.sendGrid = {
    apiKey: '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'
};


require('./Ext');
require('./Main');
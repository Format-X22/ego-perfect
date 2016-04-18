global.outerResourcesConfig = {};

outerResourcesConfig.cloudinary = {
    cloud_name: 'hycanb7c0',
    api_key: '137151639639889',
    api_secret: '6orwlZpRokfIQ7gmRDXk-pgpojE'
};

outerResourcesConfig.mongo = {
    dataBaseLink: 'mongodb://admin:114430fK@ds031551.mongolab.com:31551/heroku_hfxkwqsw'
};

outerResourcesConfig.sendGrid = {
    apiKey: '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'
};


require('./Ext');
require('./Main');
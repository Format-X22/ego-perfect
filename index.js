global.serverRootPath = __dirname;

global.outerResourcesConfig = {};

outerResourcesConfig.cloudinary = {
    cloud_name: 'hycanb7c0',
    api_key: '137151639639889',
    api_secret: '6orwlZpRokfIQ7gmRDXk-pgpojE'
};

outerResourcesConfig.mongo = {
    dataBaseLink:
        'mongodb://' +
        'admin' +
        ':' +
        'Cn2-KKg-ARZ-MZn' +
        '@ds025240-a0.mlab.com:25240,ds025240-a1.mlab.com:25240/' +
        'heroku_g44nbmm5' +
        '?replicaSet=rs-ds025240'
};

outerResourcesConfig.sendGrid = {
    apiKey: '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'
};


require('./Ext');
require('./Main');
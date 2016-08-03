/**
 * Генератор Sitemap.
 */
Ext.define('B.service.SiteMapGenerator', {
    extend: 'B.service.AbstractService',

    requires: [
        'B.mongo.Company'
    ],

    serviceNameForLogger: 'Генератор карты сайта',

    config: {

        prefix: 'http://xn--h1ailo2b.xn--80asehdb/page-',

        baseLinks: [
            'root-search',
            'root-clients',
            'root-offer',
            'root-contacts',
            'root-login',
            'root-register'
        ],

        companyIds: null,

        result: ''
    },

    constructor: function () {
        this.callParent(arguments);

        B.util.Function.queue([
            this.addBaseLinksStep,
            this.getCompaniesIdsStep,
            this.addCompaniesStep,
            this.makeResultFileStringStep,
            this.writeResultStep
        ], this);
    },

    privates: {

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        addBaseLinksStep: function (next) {
            this.addEachUrl(this.getBaseLinks());
            next();
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        getCompaniesIdsStep: function (next) {
            var companyCollection = Ext.create('B.mongo.Company').getCollection();
            var query = {};
            var projection = {_id: true};
            var cursor = companyCollection.find(query, projection);

            cursor.toArray(function (error, result) {
                if (error) {
                    this.logError('Ошибка получения списка ID компаний');
                } else {
                    this.setCompanyIds(result);
                    next();
                }
            }.bind(this));
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        addCompaniesStep: function (next) {
            var ids = this.getCompanyIds();
            var urls = Ext.Array.map(ids, this.makeCompanyUrl, this);

            this.addEachUrl(urls);

            next();
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        makeResultFileStringStep: function (next) {
            this.setResult(
                '<?xml version="1.0" encoding="UTF-8"?>' +
                '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
                    this.getResult() +
                '</urlset>'
            );

            next();
        },

        /**
         * @private
         */
        writeResultStep: function () {
            var fileSystem = require('fs');
            var path = require('path');
            var siteMap = path.join(serverRootPath, 'public', 'sitemap.xml');

            fileSystem.writeFileSync(siteMap, this.getResult());
        },

        /**
         * @private
         * @param {String[]} urls Массив ссылок.
         */
        addEachUrl: function (urls) {
            Ext.each(urls, function (url) {
                var result = this.getResult();

                result += this.makeUrlSection(url);
                result += this.makeUrlSection(url + '_gallery');
                result += this.makeUrlSection(url + '_reviews');
                result += this.makeUrlSection(url + '_map');
                
                this.setResult(result);
            }, this);
        },

        /**
         * @private
         * @param {String} url Ссылка
         * @return {String} Секция sitemap.xml.
         */
        makeUrlSection: function (url) {
            var siteUrl = this.getPrefix() + url;

            return '<url><loc>' + siteUrl + '</loc></url>';
        },

        /**
         * @private
         * @param {Object} idObject ID в объекте.
         * @return {String} Ссылка компании.
         */
        makeCompanyUrl: function (idObject) {
            return 'company-' + idObject._id;
        }
    }
});
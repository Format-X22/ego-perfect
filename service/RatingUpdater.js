/**
 * Сервис для ежедневного обновления рейтингов компаний.
 */
Ext.define('B.service.RatingUpdater', {
    extend: 'B.service.AbstractService',

    serviceNameForLogger: 'Обновление рейтингов',

    config: {

        /**
         * @private
         * @cfg {Object[]} companies Массив данных компаний.
         */
        companies: null
    },

    constructor: function () {
        this.callParent(arguments);

        B.util.Function.queue([
            this.incrementRatingStep,
            this.extractCompaniesStep,
            this.updateSearchStep
        ], this);
    },

    privates: {

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        incrementRatingStep: function (next) {
            B.Mongo.getCollection('company').update(
                {
                    payDate: {
                        $gt: new Date()
                    }
                },
                {
                    $inc: {
                        rating: 10
                    }
                },
                {
                    multi: true
                },
                function (error) {
                    if (error) {
                        this.logError('Ошибка инкремента');
                    } else {
                        next();
                    }
                }
            );
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        extractCompaniesStep: function (next) {
            B.Mongo.getCollection('company').find(
                {
                    payDate: {
                        $gt: new Date()
                    }
                },
                {
                    rating: 1
                }
            ).toArray(function (error, result) {
                if (error) {
                    this.logError('Ошибка поиска');
                } else {
                    this.setCompanies(result);
                    next();
                }
            }.bind(this));
        },

        /**
         * @private
         */
        updateSearchStep: function () {
            var companies = this.getCompanies();
            var company;
            
            while (companies.length) {
                company = companies.pop();
                
                B.Mongo.getCollection('search').update(
                    {
                        company: B.Mongo.makeId(company._id)
                    },
                    {
                        $set: {
                            rating: company.rating || 0
                        }
                    },
                    (function (company) {
                        return function (error) {
                            if (error) {
                                this.logError('Ошибка обновления для ' + company._id);
                            }
                        }.bind(this)
                    }).call(this, company)
                );
            }
        }
    }
});
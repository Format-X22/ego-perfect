/**
 * Поисковый механизм.
 */
Ext.define('B.biz.search.Search', {
    extend: 'B.AbstractRequestHandler',

    requires: [
        'B.biz.search.util.Tokens'
    ],

    config: {

        /**
         * @private
         * @cfg {Object} mongoSearchCollection Коллекция для поиска в базе данных.
         */
        mongoSearchCollection: null,

        /**
         * @private
         * @cfg {String[]} tokens Поисковые токены.
         */
        tokens: null,

        /**
         * @private
         * @cfg {Object} fieldsToReturn Поля для возврата из базы.
         */
        fieldsToReturn: {
            _id: 1,
            tags: 1,
            rating: 1,
            company: 1,
            map: 1
        },

        /**
         * @private
         * @cfg {Object} geo Утилита для работы с гео-расстояниями.
         */
        geo: require('geolib')
    },

    constructor: function () {
        this.callParent(arguments);
        this.setMongoSearchCollection(B.Mongo.getCollection('search'));

        this.getRequestModel().set('limit', 10000); // @TODO до подключения динамической загрузки
        
        B.util.Function.queue([
            this.makeQueryTokens,
            this.doDBQuery
        ], this);
    },

    privates: {

        /**
         * @private
         */
        makeQueryTokens: function (next) {
            Ext.create('B.biz.search.util.Tokens', {
                value: this.getRequestModel().get('query'),
                scope: this,
                callback: function (self, value) {
                    this.setTokens(value);
                    next();
                }
            });
        },

        /**
         * @private
         */
        doDBQuery: function () {
            var model = this.getRequestModel();
            var cursor = this.findCursor();
            var sendResult = this.sendResult.bind(this);

            if (this.isEmptyTokens()) {
                cursor
                    .sort({rating: -1})
                    .toArray(sendResult);
            } else {
                cursor
                    .skip(model.get('start'))
                    .limit(model.get('limit'))
                    .toArray(sendResult);
            }
        },

        /**
         * @private
         * @return {Object} Курсор Mongo.
         */
        findCursor: function () {
            var dbQuery = this.makeDBQuery();
            var collection = this.getMongoSearchCollection();
            var fields = this.getFieldsToReturn();

            return collection.find(dbQuery, fields);
        },

        /**
         * @private
         */
        sendResult: function (error, data) {
            var model = this.getRequestModel();
            var start = model.get('start');
            var limit = model.get('limit');

            if (error) {
                this.sendSearchError();
                return;
            }

            if (!this.isEmptyTokens()) {
                data = data.splice(start, limit);
            }

            this.sortAndSend(data);
        },

        /**
         * @private
         */
        sendSearchError: function () {
            this.getProtocol().sendError('Ошибка запроса к базе данных при поиске!');
        },

        /**
         * @private
         */
        sortAndSend: function (data) {
            var needSort = !this.isEmptyTokens();

            if (needSort) {
                data = this.sortResult(data);
            }
            
            data = data.map(function (item) {
                return {
                    id: item._id,
                    company: item.company
                }
            });

            this.getProtocol().sendData(data);
        },

        /**
         * @private
         * @return {Boolean} Пустой ли набор токенов.
         */
        isEmptyTokens: function () {
            return this.getTokens()[0] === '';
        },

        /**
         * @private
         * @param {Object[]} data Массив результата запроса для сортировки.
         * @return {Object[]} Массив отсортированных данных.
         */
        sortResult: function (data) {
            if (this.isCoordinatesPresent()) {
                var geoSorted = this.geoSortAndEqualsCalculate(data);
                var equalsAndRatingSorted = Ext.Array.map(geoSorted, function (group) {
                    return this.sortByEqualsAndRating(group);
                }, this);

                return Ext.Array.flatten(equalsAndRatingSorted);
            } else {
                return this.sortByEqualsAndRating(data);
            }
        },

        /**
         * @private
         * @param {Object[]} data Массив результата запроса для сортировки.
         * @return {Object[]} Массив отсортированных данных.
         */
        sortByEqualsAndRating: function (data) {
            return data.sort(function (itemA, itemB) {
                this.applyTokenEqualsCount(itemA, itemB);

                return this.compareResultItems(itemA, itemB);
            }.bind(this));
        },

        /**
         * @private
         * @param {Object[]} data Массив результата запроса для сортировки.
         * @return {Array[]} Массив массивов отсортированных данных.
         */
        geoSortAndEqualsCalculate: function (data) {
            var result = [[],[],[],[],[],[],[],[],[]];
            var model = this.getRequestModel();
            var meter = this.getDistanceMeter({
                latitude: parseFloat(model.get('lat')),
                longitude: parseFloat(model.get('lng'))
            });

            Ext.each(data, function (item) {
                var itemGeo = {
                    latitude: parseFloat(item.map.lat),
                    longitude: parseFloat(item.map.lng)
                };

                switch (true) {
                    case meter(itemGeo) < 1000:
                        result[0].push(item);
                        break;
                    case meter(itemGeo) < 5000:
                        result[1].push(item);
                        break;
                    case meter(itemGeo) < 15000:
                        result[2].push(item);
                        break;
                    case meter(itemGeo) < 25000:
                        result[3].push(item);
                        break;
                    case meter(itemGeo) < 50000:
                        result[4].push(item);
                        break;
                    case meter(itemGeo) < 75000:
                        result[5].push(item);
                        break;
                    case meter(itemGeo) < 100000:
                        result[6].push(item);
                        break;
                    case meter(itemGeo) < 300000:
                        result[7].push(item);
                        break;
                    default:
                        result[8].push(item);
                }

                this.setTokenEqualsCount(item);
            }, this);

            return result;
        },

        /**
         * @private
         * @param {Object} from От.
         * @return {Function} Функция принимающая параметром значение до куда.
         */
        getDistanceMeter: function (from) {
            return function (to) {
                return this.getGeo().getDistance(from, to);
            }.bind(this);
        },

        /**
         * @private
         * @param {Object} itemA Первый документ.
         * @param {Object} itemB Второй документ.
         * @return {Number} Предикат сортировки.
         */
        compareResultItems: function (itemA, itemB) {
            var aCount = itemA.equalsCount;
            var bCount = itemB.equalsCount;
            var aRating = itemA.rating;
            var bRating = itemB.rating;
            
            if (aCount < bCount) {
                return 1;
            }

            if (aCount > bCount) {
                return -1;
            }

            if (aRating < bRating) {
                return 1;
            }

            if (aRating > bRating) {
                return -1;
            }

            return 0;
        },

        /**
         * @private
         * @param {Object} itemA Первый документ.
         * @param {Object} itemB Второй документ.
         */
        applyTokenEqualsCount: function (itemA, itemB) {
            if (!itemA.equalsCount) {
                this.setTokenEqualsCount(itemA);
            }

            if (!itemB.equalsCount) {
                this.setTokenEqualsCount(itemB);
            }
        },

        /**
         * @private
         * @param {Object} item Один документ результата запроса.
         */
        setTokenEqualsCount: function (item) {
            item.equalsCount = 0;

            this.getTokens().forEach(function (token) {
                Ext.each(item.tags, function (tag) {
                    if (token === tag) {
                        item.equalsCount++;
                    }
                });
            });

            item.equalsCount = Math.floor(item.equalsCount / 3);
        },

        /**
         * @private
         * @return {Object} Запрос для базы.
         */
        makeDBQuery: function () {
            if (this.isEmptyTokens()) {
                return {};
            } else {
                return {
                    tags: {
                        $in: this.getTokens()
                    }
                };
            }
        },

        /**
         * @private
         * @return {Boolean} Представлены ли координаты.
         */
        isCoordinatesPresent: function () {
            var model = this.getRequestModel();

            return model.get('lat') && model.get('lng');
        }
    }
});

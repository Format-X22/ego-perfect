/**
 * Сервис увеличивания просмотров.
 */
Ext.define('B.service.ViewUp', {
    extend: 'B.service.AbstractService',

    serviceNameForLogger: 'Обновление просмотров',

    config: {

        /**
         * @private
         * @cfg {Object} mongoCollection Mongo-коллекция данных компаний.
         */
        mongoCollection: null,

        /**
         * @private
         * @cfg {Object[]} ids Массив объектов с единственным полем _id.
         */
        ids: null
    },

    constructor: function () {
        this.callParent(arguments);

        B.util.Function.queue([
            this.extractIdsStep,
            this.updateRatingStep,
            this.destroy
        ], this);
    },

    privates: {

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        extractIdsStep: function (next) {
            var collection = Ext.create('B.mongo.Company').getCollection();
            var now = new Date();
            var commercialStart = Ext.Date.parse('01.06.2016', 'd.m.Y');


            this.setMongoCollection(collection);

            collection.find(
                {
                    payDate: {
                        $gt: now
                    },
                    registerDate: {
                        $gt: commercialStart
                    }
                },
                {
                    _id: true
                }
            ).toArray(function (error, result) {
                if (error) {
                    this.logError('Невозможно получить список компаний');
                } else {
                    this.setIds(result);
                    next();
                }
            }.bind(this));
        },

        /**
         * @private
         * @param {Function} next Следующий шаг.
         */
        updateRatingStep: function (next) {
            var collection = this.getMongoCollection();
            var queue = [];
            
            Ext.each(this.getIds(), function (idObj) {
                var id = idObj._id;

                queue.push(function (next) {
                    collection.update(
                        {
                            _id: B.Mongo.safeMakeId(id)
                        },
                        {
                            $inc: {
                                views: Ext.Number.randomInt(300, 600)
                            }
                        },
                        function (error) {
                            if (error) {
                                this.logError('Ошибка обновления для ' + id);
                            }
                            next();
                        }.bind(this)
                    );
                });
            }, this);

            queue.push(next);

            B.util.Function.queue(queue, this);
        }
    }
});
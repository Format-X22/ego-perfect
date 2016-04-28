/**
 * Генератор скидочных ключей.
 * Выводит _id ключей в консоль.
 */
Ext.define('B.service.KeyGen', {
    extend: 'B.service.AbstractService',

    serviceNameForLogger: 'Генератор ключей',

    config: {

        /**
         * @cfg {Number} Количество бесплатных месяцев.
         */
        month: 36,

        /**
         * @cfg {Number} Количество ключей.
         */
        count: 1
    },

    constructor: function () {
        this.callParent(arguments);

        var query = this.generateQuery();

        B.Mongo.getCollection('keys').insert(
            query,
            function (error, result) {
                if (error) {
                    this.logError('Ошибка генерации ключей');
                } else {
                    this.logResult(result);
                }
            }.bind(this)
        );
    },

    privates: {

        /**
         * @private
         * @return {Object[]} Запрос в базу.
         */
        generateQuery: function () {
            var key = this.getKeyConfig();
            var count = this.getCount();
            var i = 0;
            var query = [];

            for (; i < count; i++) {
                query.push(Ext.clone(key));
            }

            return query;
        },

        /**
         * @private
         * @return {Object} Конфиг ключа.
         */
        getKeyConfig: function () {
            return {
                month: this.getMonth()
            }
        },

        /**
         * @private
         * @param {Object} result Объект результата базы.
         */
        logResult: function (result) {
            var ids = result.insertedIds;

            Ext.each(ids, function (id) {
                console.log(id);
            }, this);
        }
    }
});
/**
 * Набор утилит для работы с функциями.
 */
'use strict';

/**
 * Создает асинхронную очередь выполнения,
 * в каждую последующую функцию передается
 * колбек для вызова следующей.
 * @param {Function[]} callbacks Массив функций.
 * @param {Object} [defaultScope] Базовый скоп для функций.
 */
exports.queue = function (callbacks, defaultScope) {
    var index = 0;

    (function self () {
        var fn = callbacks[index++];

        fn && fn.call(defaultScope, self);
    })();
};
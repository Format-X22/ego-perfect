'use strict';

/**
 * @singleton
 * Набор утилит для работы с функциями.
 */
class Fn {
    queue (callbacks, defaultScope) {
        var index = 0;

        (function self () {
            var fn = callbacks[index++];

            fn && fn.call(defaultScope, self);
        })();
    }
}

module.exports = new Fn();
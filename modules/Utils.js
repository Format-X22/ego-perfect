/**
 * Модуль утилит.
 */
'use strict';

/**
 * Обертка над backFalse.
 * Позволяет первым вызовом сразу задать falseCallback,
 * а trueCallback определять вторым вызовом.
 * В остальном повторяет поведение falseCallback.
 * @param {Function} falseCallback Колбек неудачи.
 * @return {Function} Функция, принимаюшая колбек удачи и возвращающая вызов backFalse.
 */
exports.getStoredBackFalse = function (falseCallback) {
    return function (trueCallback) {
        return exports.backFalse(falseCallback, trueCallback);
    }
};

/**
 * Возвращает обертку, принимающую результат.
 * В случае если результат с приведением типов равен false
 * вызывает falseCallback со значением false,
 * иначе передает вызов trueCallback с теми же аргументами.
 * @param {Function} falseCallback Колбек неудачи.
 * @param {Function} trueCallback Колбек удачи со значением.
 * @return {Function} Обертка, принимающая результат.
 */
exports.backFalse = function (falseCallback, trueCallback) {
    return function (result) {
        if (result) {
            trueCallback.apply(null, arguments);
        } else {
            falseCallback(false);
        }
    }
};
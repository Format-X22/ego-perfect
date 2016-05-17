/**
 * Утилита для работы с токенами.
 */
Ext.define('B.biz.search.util.Tokens', {
    extend: 'B.AbstractRequestHandler',

    config: {

        /**
         * @cfg {String/String[]} value Значение для парсинга.
         */
        value: null,

        /**
         * @cfg {Function} Следующий шаг после завершения парсинга.
         */
        callback: null,

        /**
         * @cfg {Object/Null} Контекст исполнения, если нужен.
         */
        scope: null
    },

    constructor: function (config) {
        this.initConfig(
            Ext.apply(
                Ext.clone(this.config),
                config
            )
        );

        var value = this.getValue();
        var scope = this.getScope() || this;

        value = this.normalize(value);
        value = this.removeTags(value);
        value = this.split(value);
        value = this.removeEnds(value);
        value = this.removeDuplicates(value);
        value = this.removeEmpty(value);

        this.setValue(value);

        this.getCallback().call(scope, this, value);
    },

    privates: {

        /**
         * @private
         * @param {String/String[]} value Значение.
         * @return {String} Нормализированное значение.
         */
        normalize: function (value) {
            value = value || '';
            
            if (Ext.isArray(value)) {
                value = value.join(' ');
            }

            return value;
        },

        /**
         * @private
         * @param value {String} Значение.
         * @return {String} Очищенное значение.
         */
        removeTags: function (value) {
            return B.util.String.removeTags(value);
        },

        /**
         * @private
         * @param {String} value Значение.
         * @return {String[]} Токены.
         */
        split: function (value) {
            return value
                .toLowerCase()                                  // Приводим к строчным буквам
                .replace(/&nbsp;|\u200B|\n|\r/g, ' ')           // Убираем всевозможный мусор
                .replace(/\.|,|\?|!|;|"|«|»|'|\(|\)|_/g, ' ')   // Убираем знаки препинания
                .replace(/ +/g, ' ')                            // Заменяем повторяющиеся пробелы на 1 пробел
                .replace(/ - /g, '-')                           // Схлопываем тире в дефис
                .replace(/ -|- /g, '-')                         // И по краям
                .replace(/\/\/|\\/g, ' ')                       // Заменяем слеши на пробелы
                .replace(/ +/g, ' ')                            // Заменяем повторяющиеся пробелы на 1 пробел
                .replace(/ . /g, ' ')                           // Убираем однобуквенные слова
                .replace(/ .. /g, ' ')                          // Убираем двухбуквенные слова
                .replace(/^. | .$/g, '')                        // И по краям однобуквенные
                .replace(/^.. | ..$/g, '')                      // И по краям двухбуквенные
                .replace(/ё/g, 'е')                             // Меняем "ё" на "е" для фикса вариантов написания
                .split(' ');                                    // Режем на части по пробелу
        },

        /**
         * @private
         * @param {String[]} value Токены.
         * @return {String[]} Токены без окончаний.
         */
        removeEnds: function (value) {
            return value.map(function (token) {
                token = token.trim();                // Убираем пробельные символы у токена, есть кейсы

                if (token.length < 6) {              // 3-5 букв, режем однобуквенные окончания
                    return token.slice(0, -1);
                }

                if (token.length < 8) {              // 6-7 букв, режем двухбуквенные окончания
                    return token.slice(0, -2);
                }

                return token.slice(0, -3);           // 8 и более букв, режем трехбуквенные окончания
            });
        },

        /**
         * @private
         * @param {String[]} value Токены.
         * @return {String[]} Только уникальные токены.
         */
        removeDuplicates: function (value) {
            return Ext.Array.unique(value);
        },

        /**
         * @private
         * @param {String[]} value Токены.
         * @return {String[]} Токены без пустых значений.
         */
        removeEmpty: function (value) {
            if (value.length > 1) {
                return Ext.Array.clean(value);
            } else {
                return value;
            }
        }
    }
});

/**
 * Абстрактный класс письма.
 */
Ext.define('B.mail.AbstractMail', {

    mixins: [
        'B.mixin.AsyncResult'
    ],

    config: {

        /**
         * @cfg {String} signature Универсальная подпись для писем с контактами.
         */
        signature: [
            '<hr>' +
            'ООО "Простые числа"',
            '<a href="http://фирмы.онлайн/">http://фирмы.онлайн</a>',
            '<a href="mailto:w@фирмы.онлайн">w@фирмы.онлайн</a>',
            '+7 (925) 154-68-79'
        ].join('<br><br>')
    },

    constructor: function (config) {
        this.initConfig(
            Ext.apply(
                Ext.clone(this.config),
                config
            )
        );
    }
});
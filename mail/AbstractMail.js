/**
 * Абстрактный класс письма.
 */
Ext.define('B.mail.AbstractMail', {

    mixins: [
        'B.mixin.AsyncResult'
    ],

    requires: [
        'B.mail.Sender'
    ],

    config: {

        /**
         * @cfg {String} from (required) От кого.
         */
        from: 'robot@firms-online.com',

        /**
         * @cfg {String} to (required) Кому.
         */
        to: '',

        /**
         * @cfg {String} subject (required) Тема письма.
         */
        subject: '',

        /**
         * @cfg {String} html
         * Текст письма в виде HTML.
         * Смотри также {@link #tpl}.
         */
        html: '',

        /**
         * @cfg {String} tpl
         * Шаблон письма в виде строки.
         * При указании любого значения в этом поле конфига - использует его вместо {@link #html}.
         * В качестве источника данных использует поле конфига {@link #data}.
         */
        tpl: '',

        /**
         * @cfg {Object} data
         * Объект с данными для шаблона письма.
         * Это свойство можно устанавливать в теле метода {@link #init}.
         */
        data: null,

        /**
         * @cfg {Boolean} autoSend
         * Необходимо ли автоматически отправлять письмо при создании класса.
         */
        autoSend: true,

        /**
         * @cfg {String} signature Подпись для письма.
         */
        signature: [
            '<hr>' +
            'ООО "Простые числа"',
            '<a href="http://firms-online.com/">http://фирмы.онлайн</a>',
            '<a href="mailto:w@firms-online.com">w@firms-online.com</a>',
            '<a href="tel:88002500186">8 (800) 25-00-186</a>'
        ].join('<br><br>')

        /**
         * @method failure
         * @inheritdoc
         * @localdoc
         * @param {Object} error Объект ошибки.
         */
    },

    constructor: function (config) {
        this.initConfig(
            Ext.apply(
                Ext.clone(this.config),
                config
            )
        );

        this.init();

        if (this.getAutoSend()) {
            this.send();
        }
    },

    /**
     * @method init
     * Метод для инициализации кастомной логики класса.
     * Рекомендуется переопределять этот метод вместо конструктора.
     */
    init: Ext.emptyFn,

    /**
     * Отправка письма.
     * Вызывается автоматически при создании класса,
     * отключается изменением {@link #autoSend}.
     */
    send: function () {
        var tpl = this.getTpl();
        var data = this.getData();
        var config = {
            from: this.getFrom(),
            to: this.getTo(),
            subject: this.getSubject()
        };

        if (tpl) {
            config.html = new Ext.Template(tpl).apply(data);
        } else {
            config.html = this.getHtml();
        }

        config.html += this.getSignature();

        B.mail.Sender.send(config, this.callbackCaller.bind(this));
    },

    privates: {

        /**
         * @private
         * @param {Object} error Объект ошибки.
         */
        callbackCaller: function (error) {
            if (error) {
                this.callFailure(error);
            } else {
                this.callSuccess();
            }
        }
    }
});